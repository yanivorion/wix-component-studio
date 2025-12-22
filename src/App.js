import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { useComponentLibrary } from './hooks/useComponentLibrary';
import { ThemeProvider, useTheme } from './ThemeSwitcher';
import { getApiEndpoint, API_ENDPOINTS, shouldUseClientSideAPI } from './apiConfig';
import { generateSingleComponent, generateBulkComponents } from './claudeClient';
import COMPREHENSIVE_SYSTEM_INSTRUCTIONS from './systemPrompt';
import html2canvas from 'html2canvas';

// Scroll utilities for components
const getScrollContainer = () => {
  const container = document.querySelector('[data-scroll-container="true"]');
  if (container && container.parentElement) {
    let scrollParent = container;
    while (scrollParent && !scrollParent.classList.contains('canvas-wrapper')) {
      scrollParent = scrollParent.parentElement;
    }
    return scrollParent;
  }
  return window;
};

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const container = getScrollContainer();
    
    const handleScroll = () => {
      if (container === window) {
        setScrollY(window.scrollY || window.pageYOffset);
      } else {
        setScrollY(container.scrollTop);
      }
    };
    
    handleScroll();
    
    if (container === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  return scrollY;
};

if (typeof window !== 'undefined') {
  window.getScrollContainer = getScrollContainer;
  window.useScrollPosition = useScrollPosition;
}

// Toast notification component
function Toast({ message, type = 'info', onClose }) {
  const { theme } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    info: { bg: theme.accent1, text: theme.base1 },
    success: { bg: theme.accent3, text: theme.base1 },
    error: { bg: '#DC2626', text: '#FFFFFF' }
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: colors[type].bg,
      color: colors[type].text,
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: 10000,
      animation: 'slideIn 300ms ease-out',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      {type === 'success' && '✓'}
      {type === 'error' && '✕'}
      {type === 'info' && 'ℹ'}
      {message}
            </div>
          );
}

// Error Modal Component
function ErrorModal({ error, errorInfo, onRemove, onClose, componentName }) {
  const { theme } = useTheme();
  
  const parseError = (error, errorInfo) => {
    const stack = errorInfo?.componentStack || error?.stack || '';
    const message = error?.message || error?.toString() || 'Unknown error';
    
    // Try to extract the actual error line
    const lines = stack.split('\n');
    const relevantLines = lines.slice(0, 5).join('\n');
    
    return {
      message,
      stack: relevantLines,
      fullStack: stack
    };
  };
  
  const { message, stack, fullStack } = parseError(error, errorInfo);
  const [showFullStack, setShowFullStack] = useState(false);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 100000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: theme.base1,
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: `1px solid ${theme.shade2}`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#FEE2E2',
            display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
            fontSize: '24px'
          }}>
            ⚠️
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '500',
              color: theme.text1,
              marginBottom: '4px'
            }}>
              Component Error Detected
            </h2>
      <p style={{
              margin: 0,
              fontSize: '14px',
              color: theme.text3
            }}>
              {componentName || 'This component'} encountered an error and cannot render
            </p>
          </div>
        </div>
        
        {/* Error Details */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px'
        }}>
          <div style={{
            marginBottom: '16px'
          }}>
            <h3 style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              fontWeight: '500',
              color: theme.text2,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Error Message
            </h3>
            <div style={{
              padding: '12px',
              backgroundColor: theme.shade1,
        borderRadius: '6px',
              borderLeft: `4px solid #DC2626`,
              fontSize: '14px',
              color: theme.text1,
              fontFamily: 'monospace',
              wordBreak: 'break-word'
            }}>
              {message}
            </div>
          </div>
          
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '500',
                color: theme.text2,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Stack Trace
              </h3>
              <button
                onClick={() => setShowFullStack(!showFullStack)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme.accent1,
                  fontSize: '12px',
        cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
        fontWeight: '500'
                }}
              >
                {showFullStack ? 'Show Less' : 'Show Full Stack'}
      </button>
    </div>
            <div style={{
              padding: '12px',
              backgroundColor: theme.base2,
              borderRadius: '6px',
              fontSize: '12px',
              color: theme.text2,
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxHeight: showFullStack ? 'none' : '200px',
              overflow: 'auto',
              lineHeight: '1.6'
            }}>
              {showFullStack ? fullStack : stack}
            </div>
          </div>
          
          {/* Common Issues Help */}
    <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#FEF3C7',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#92400E',
            lineHeight: '1.6'
          }}>
            <strong>💡 Common Issues:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>Missing <code>config = {'{}'}</code> default parameter</li>
              <li>Using <code>config.property</code> instead of <code>config?.property</code></li>
              <li>Invalid dataType in MANIFEST</li>
              <li>Animating plain objects instead of DOM elements</li>
              <li>Hard-coded SVG filter IDs causing conflicts</li>
            </ul>
          </div>
        </div>
        
        {/* Footer Actions */}
      <div style={{
          padding: '20px 24px',
          borderTop: `1px solid ${theme.shade2}`,
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: `1px solid ${theme.shade3}`,
              backgroundColor: theme.base1,
              color: theme.text2,
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.shade1;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.base1;
            }}
          >
            Keep Component
          </button>
          <button
            onClick={onRemove}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#B91C1C';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#DC2626';
            }}
          >
            Remove Component
          </button>
          </div>
      </div>
    </div>
  );
}

// Error Boundary Component
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleRemove = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  handleClose = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
  return (
        <ErrorModal
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRemove={this.handleRemove}
          onClose={this.handleClose}
          componentName={this.props.componentName}
        />
      );
    }

    return this.props.children;
  }
}
function CategoryBrowser() {
  const [library, setLibrary] = React.useState([]);
  const [organized, setOrganized] = React.useState({});

  React.useEffect(() => {
    fetch('/components-full.json')
      .then(res => res.json())
      .then(data => {
        setLibrary(data);
        
        // Organize into categories
        const cats = {};
        data.forEach(comp => {
          const cat = comp.category || 'Uncategorized';
          const sub = comp.subcategory || 'General';
          
          if (!cats[cat]) cats[cat] = {};
          if (!cats[cat][sub]) cats[cat][sub] = [];
          
          cats[cat][sub].push(comp);
        });
        
        setOrganized(cats);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Component Library by Category</h1>
      
      {Object.entries(organized).map(([category, subcategories]) => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2>{category} ({Object.values(subcategories).flat().length} components)</h2>
          
          {Object.entries(subcategories).map(([subcategory, components]) => (
            <div key={subcategory} style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <h3>{subcategory} ({components.length})</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {components.map(comp => (
                  <div 
                    key={comp.id}
                    style={{
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(comp.code);
                      alert(`Copied ${comp.displayName}!`);
                    }}
                  >
                    {comp.displayName}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const { theme } = useTheme();
  
  // State declarations
  const [tabs, setTabs] = useState([
    { id: 1, name: 'Component 1', code: '', manifest: null, config: {} }
  ]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [draggedTabId, setDraggedTabId] = useState(null);
  const [dragOverTabId, setDragOverTabId] = useState(null);
  const {builtInComponents, componentCategories, isLoading: libraryLoading} = useComponentLibrary();
  const [componentThumbnails, setComponentThumbnails] = useState({});

  const [activeTabId, setActiveTabId] = useState(1);
  const [nextTabId, setNextTabId] = useState(2);
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 'auto' });
  const [showEditor, setShowEditor] = useState(true);
  const [error, setError] = useState(null);
  const [viewportMode, setViewportMode] = useState('desktop');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [projectName, setProjectName] = useState('Custom Components V9');
  const [userPrompt, setUserPrompt] = useState('');
  const [designBrief, setDesignBrief] = useState('');
  
  const [showLibrary, setShowLibrary] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showGrid, setShowGrid] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [toast, setToast] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  
  const [responsiveMode, setResponsiveMode] = useState(false);
  const [fixedSectionMode, setFixedSectionMode] = useState(false);
  const [selectedFont, setSelectedFont] = useState('system');
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
  const canvasWrapperRef = useRef(null);
  const outerCanvasWrapperRef = useRef(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [savedComponents, setSavedComponents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [showSessions, setShowSessions] = useState(false);
  const [editingTabId, setEditingTabId] = useState(null);
  const [tempTabName, setTempTabName] = useState('');
  const [sectionMode, setSectionMode] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollThumb, setScrollThumb] = useState({ height: 0, top: 0 });
  const hideScrollbarTimerRef = useRef(null);
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const [claudeApiKey, setClaudeApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkPrompts, setBulkPrompts] = useState('');
  const [bulkResults, setBulkResults] = useState([]);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  const [csvFileName, setCsvFileName] = useState('');
  const [systemInstructions, setSystemInstructions] = useState(COMPREHENSIVE_SYSTEM_INSTRUCTIONS);
  const bulkCancelRef = useRef(false);
  
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const LAST_WORKING_KEY = 'customComponents_lastWorking';

  const activeTab = tabs.find(t => t.id === activeTabId);
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const defaultCode = `const MANIFEST = {
  "type": "Layout.CircularMenu",
  "description": "Rotating circular menu with hover effects and hamburger toggle",
  "editorElement": {
    "selector": ".circular-menu",
    "displayName": "Circular Menu",
    "archetype": "container",
    "data": {
      "items": {
        "dataType": "text",
        "displayName": "Menu Items (comma-separated)",
        "defaultValue": "HOME,ABOUT,SERVICES,PORTFOLIO,TEAM,CAREERS,BLOG,CONTACT",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "radius": {
        "dataType": "select",
        "displayName": "Circle Radius",
        "defaultValue": "300",
        "options": ["250", "300", "350", "400"],
        "group": "Layout"
      }
    }
  }
};

function Component({ config = {} }) {
  const items = (config.items || "HOME,ABOUT,SERVICES,PORTFOLIO").split(',').map(item => item.trim());
  const radius = parseInt(config.radius || '300');
  const increment = 360 / items.length;
  
  return (
    <div style={{
      backgroundColor: config.backgroundColor || '#000000',
      width: '100%',
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
        {items.map((item, index) => {
          const angle = index * increment;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: \`rotate(\${angle}deg) translateX(\${radius}px) rotate(-\${angle}deg)\`,
                transformOrigin: '0px 0px',
                color: config.textColor || '#FFFFFF',
                fontSize: '24px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = \`rotate(\${angle}deg) translateX(\${radius}px) rotate(-\${angle}deg) scale(1.1)\`}
              onMouseLeave={(e) => e.currentTarget.style.transform = \`rotate(\${angle}deg) translateX(\${radius}px) rotate(-\${angle}deg) scale(1)\`}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}`;

  const [editorCode, setEditorCode] = useState(defaultCode);

  // Callback handlers
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  const addToHistory = useCallback((snapshot) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(snapshot);
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    const snapshot = history[historyIndex - 1];
    setTabs(snapshot.tabs);
    setActiveTabId(snapshot.activeTabId);
    setHistoryIndex(prev => prev - 1);
    showToast('Undo', 'info');
  }, [canUndo, history, historyIndex, showToast]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    const snapshot = history[historyIndex + 1];
    setTabs(snapshot.tabs);
    setActiveTabId(snapshot.activeTabId);
    setHistoryIndex(prev => prev + 1);
    showToast('Redo', 'info');
  }, [canRedo, history, historyIndex, showToast]);

  const handleExportProject = useCallback(() => {
    const project = {
      version: '1.0',
      projectName,
      tabs,
      activeTabId,
      canvasSize,
      viewportMode,
      zoomLevel,
      responsiveMode,
      fixedSectionMode,
      selectedFont,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Project exported', 'success');
  }, [projectName, tabs, activeTabId, canvasSize, viewportMode, zoomLevel, responsiveMode, fixedSectionMode, selectedFont, showToast]);

  const buildSnapshot = useCallback(() => ({
    version: '1.0',
    projectName,
    tabs,
    activeTabId,
    canvasSize,
    viewportMode,
    zoomLevel,
    responsiveMode,
    fixedSectionMode,
    selectedFont,
    timestamp: Date.now()
  }), [projectName, tabs, activeTabId, canvasSize, viewportMode, zoomLevel, responsiveMode, fixedSectionMode, selectedFont]);

  const updateScrollbarThumb = useCallback(() => {
    const el = canvasWrapperRef.current;
    if (!el) return;
    const viewport = el.clientHeight;
    const content = el.scrollHeight;
    if (content <= viewport) {
      setScrollThumb({ height: 0, top: 0 });
      return;
    }
    const ratio = viewport / content;
    const height = Math.max(24, Math.round(viewport * ratio));
    const maxTop = viewport - height;
    const top = Math.round((el.scrollTop / (content - viewport)) * maxTop);
    setScrollThumb({ height, top });
  }, []);

  const handleImportProject = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);
        setProjectName(project.projectName || 'Imported Project');
        setTabs(project.tabs || []);
        setActiveTabId(project.activeTabId || 1);
        setCanvasSize(project.canvasSize || { width: 1280, height: 'auto' });
        setViewportMode(project.viewportMode || 'desktop');
        setZoomLevel(project.zoomLevel || 100);
        setResponsiveMode(project.responsiveMode || false);
        setFixedSectionMode(project.fixedSectionMode || false);
        setSelectedFont(project.selectedFont || 'system');
        
        addToHistory({ tabs: project.tabs, activeTabId: project.activeTabId });
        
        showToast('Project imported', 'success');
      } catch (err) {
        showToast('Failed to import', 'error');
        console.error('Import error:', err);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }, [addToHistory, showToast]);

  const handleDuplicateTab = useCallback(() => {
    if (!activeTab) return;
    
    const newTab = {
      id: nextTabId,
      name: `${activeTab.name} (Copy)`,
      code: activeTab.code,
      manifest: activeTab.manifest,
      config: { ...activeTab.config },
      sections: activeTab.sections ? activeTab.sections.map(s => ({ ...s, id: `${Date.now()}_${Math.random()}` })) : undefined,
      projectName: activeTab.projectName,
      prompt: activeTab.prompt,
      designBrief: activeTab.designBrief
    };
    
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    setActiveTabId(nextTabId);
    setNextTabId(nextTabId + 1);
    addToHistory({ tabs: newTabs, activeTabId: nextTabId });
    showToast('Tab duplicated', 'success');
  }, [activeTab, tabs, nextTabId, addToHistory, showToast]);

  const handleScreenshot = useCallback(async () => {
    if (!canvasWrapperRef.current || !activeTab) {
      showToast('No component to capture', 'error');
      return;
    }

    setIsCapturingScreenshot(true);
    showToast('Capturing screenshot...', 'info');

    try {
      let html2canvasFn;
      try {
        html2canvasFn = (await import('html2canvas')).default;
      } catch (_) {
        if (!window.html2canvas) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        html2canvasFn = window.html2canvas;
      }

      if (document.fonts && document.fonts.ready) {
        try { await document.fonts.ready; } catch(_) {}
      }

      const wrapper = canvasWrapperRef.current;
      const target = wrapper.querySelector('section') || wrapper;
      const dpr = Math.max(2, window.devicePixelRatio || 1);

      const canvas = await html2canvasFn(target, {
        backgroundColor: null,
        scale: dpr,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight
      });

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((b) => b ? resolve(b) : reject(new Error('Failed to create image')), 'image/png');
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeTab.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast('Screenshot saved!', 'success');
    } catch (err) {
      console.error('Screenshot error:', err);
      showToast('Screenshot failed: ' + err.message, 'error');
    } finally {
      setIsCapturingScreenshot(false);
    }
  }, [activeTab, showToast]);

  const handleSaveToLibrary = useCallback(() => {
    if (!activeTab || !activeTab.code) {
      showToast('No component to save', 'error');
      return;
    }

    const newComponent = {
      id: `component_${Date.now()}`,
      name: activeTab.name,
      code: activeTab.code,
      manifest: activeTab.manifest,
      config: activeTab.config,
      thumbnail: activeTab.thumbnail, // ← Include thumbnail!
      timestamp: new Date().toISOString(),
      projectName: activeTab.projectName,
      prompt: activeTab.prompt,
      designBrief: activeTab.designBrief
    };

    const updatedLibrary = [newComponent, ...savedComponents];
    setSavedComponents(updatedLibrary);
    localStorage.setItem('customComponents_library', JSON.stringify(updatedLibrary));
    
    showToast('Component saved to library', 'success');
  }, [activeTab, savedComponents, showToast]);

  const handleLoadFromSavedLibrary = useCallback((component) => {
    const newTab = {
      id: nextTabId,
      name: component.name,
      code: component.code,
      manifest: component.manifest,
      config: component.config,
      thumbnail: component.thumbnail, // ← Include thumbnail!
      projectName: component.projectName,
      prompt: component.prompt,
      designBrief: component.designBrief
    };

    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    setActiveTabId(nextTabId);
    setNextTabId(nextTabId + 1);
    addToHistory({ tabs: newTabs, activeTabId: nextTabId });
    setShowLibrary(false);
    showToast(`Loaded: ${component.name}`, 'success');
  }, [tabs, nextTabId, addToHistory, showToast]);

  const handleDeleteFromLibrary = useCallback((componentId) => {
    const updatedLibrary = savedComponents.filter(c => c.id !== componentId);
    setSavedComponents(updatedLibrary);
    localStorage.setItem('customComponents_library', JSON.stringify(updatedLibrary));
    showToast('Component deleted', 'success');
  }, [savedComponents, showToast]);

  const handleSaveSession = useCallback(() => {
    const session = {
      id: `session_${Date.now()}`,
      name: projectName,
      tabs,
      activeTabId,
      canvasSize,
      viewportMode,
      zoomLevel,
      responsiveMode,
      fixedSectionMode,
      selectedFont,
      timestamp: new Date().toISOString()
    };

    const updatedSessions = [session, ...sessions].slice(0, 20);
    setSessions(updatedSessions);
    localStorage.setItem('customComponents_sessions', JSON.stringify(updatedSessions));
    
    showToast('Session saved', 'success');
  }, [projectName, tabs, activeTabId, canvasSize, viewportMode, zoomLevel, responsiveMode, fixedSectionMode, selectedFont, sessions, showToast]);

  const handleLoadSession = useCallback((session) => {
    setProjectName(session.name);
    setTabs(session.tabs);
    setActiveTabId(session.activeTabId);
    setCanvasSize(session.canvasSize);
    setViewportMode(session.viewportMode);
    setZoomLevel(session.zoomLevel);
    setResponsiveMode(session.responsiveMode || false);
    setFixedSectionMode(session.fixedSectionMode || false);
    setSelectedFont(session.selectedFont || 'system');
    
    addToHistory({ tabs: session.tabs, activeTabId: session.activeTabId });
    setShowSessions(false);
    showToast('Session loaded', 'success');
  }, [addToHistory, showToast]);

  const handleDeleteSession = useCallback((sessionId) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    localStorage.setItem('customComponents_sessions', JSON.stringify(updatedSessions));
    showToast('Session deleted', 'success');
  }, [sessions, showToast]);

  const handleRenameTab = useCallback((tabId, newName) => {
    if (!newName.trim()) return;
    
    const newTabs = tabs.map(tab =>
      tab.id === tabId ? { ...tab, name: newName.trim() } : tab
    );
    setTabs(newTabs);
    setEditingTabId(null);
    setTempTabName('');
    addToHistory({ tabs: newTabs, activeTabId });
    showToast('Tab renamed', 'success');
  }, [tabs, activeTabId, addToHistory, showToast]);

  const handleBulkFileUpload = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    try {
      let newTabId = nextTabId;
      const newTabs = [...tabs];
      
      for (const file of files) {
        const fileName = file.name.replace(/\.(jsx|js|txt)$/, '');
        const fileContent = await file.text();
        
        newTabs.push({
          id: newTabId,
          name: fileName,
          code: fileContent,
          manifest: null,
          config: {}
        });
        
        newTabId++;
      }
      
      setTabs(newTabs);
      setActiveTabId(newTabs[newTabs.length - 1].id);
      setNextTabId(newTabId);
      setEditorCode(newTabs[newTabs.length - 1].code);
      addToHistory({ tabs: newTabs, activeTabId: newTabs[newTabs.length - 1].id });
      
      showToast(`Loaded ${files.length} component${files.length > 1 ? 's' : ''}`, 'success');
      
      event.target.value = '';
    } catch (err) {
      console.error('File upload error:', err);
      showToast('Failed to upload files', 'error');
    }
  }, [tabs, nextTabId, addToHistory, showToast]);

  const handleAddSectionAfter = useCallback((index) => {
    if (!activeTab) return;
    const newSection = { id: `sec_${Date.now()}`, code: '', config: {}, padding: '0px' };
    const newTabs = tabs.map(tab => {
      if (tab.id !== activeTabId) return tab;
      const sections = tab.sections && Array.isArray(tab.sections) ? [...tab.sections] : [];
      sections.splice(index + 1, 0, newSection);
      return { ...tab, sections };
    });
    setTabs(newTabs);
    setActiveSectionIndex(index + 1);
    setShowEditor(true);
    setEditorCode('');
    addToHistory({ tabs: newTabs, activeTabId });
  }, [activeTab, tabs, activeTabId, addToHistory]);

  const handleMoveSectionUp = useCallback((index) => {
    if (!activeTab || index <= 0) return;
    const newTabs = tabs.map(tab => {
      if (tab.id !== activeTabId) return tab;
      const sections = [...(tab.sections || [])];
      [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]];
      return { ...tab, sections };
    });
    setTabs(newTabs);
    setActiveSectionIndex(index - 1);
    addToHistory({ tabs: newTabs, activeTabId });
  }, [activeTab, tabs, activeTabId, addToHistory]);

  const handleMoveSectionDown = useCallback((index) => {
    if (!activeTab) return;
    const count = activeTab.sections ? activeTab.sections.length : 0;
    if (index >= count - 1) return;
    const newTabs = tabs.map(tab => {
      if (tab.id !== activeTabId) return tab;
      const sections = [...(tab.sections || [])];
      [sections[index + 1], sections[index]] = [sections[index], sections[index + 1]];
      return { ...tab, sections };
    });
    setTabs(newTabs);
    setActiveSectionIndex(index + 1);
    addToHistory({ tabs: newTabs, activeTabId });
  }, [activeTab, tabs, activeTabId, addToHistory]);

  const handleGenerateWithClaude = useCallback(async () => {
    if (!userPrompt.trim()) {
      showToast('Please enter a user request', 'error');
      return;
    }

    const clientSideMode = shouldUseClientSideAPI();
    
    if (!claudeApiKey && clientSideMode) {
      showToast('Please enter your Claude API key', 'error');
      return;
    }

    setIsGenerating(true);
    showToast('Generating with Claude...', 'info');

    try {
      let code;
      
      // Use client-side API if deployed without backend
      if (clientSideMode) {
        const result = await generateSingleComponent({
          prompt: userPrompt,
          designBrief,
          projectName,
          systemInstructions,
          apiKey: claudeApiKey
        });
        code = result.code;
      } else {
        // Use backend API (local development)
        const response = await fetch(getApiEndpoint(API_ENDPOINTS.CLAUDE_SINGLE), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userPrompt,
            designBrief: designBrief,
            projectName: projectName,
            systemInstructions: systemInstructions,
            apiKey: claudeApiKey
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        code = data.code;
      }
      
      setEditorCode(code);
      showToast('Code generated! Review and click "Load Component" to render', 'success');
    } catch (err) {
      console.error('Claude generation error:', err);
      showToast('Generation failed: ' + err.message, 'error');
    } finally {
      setIsGenerating(false);
    }
  }, [userPrompt, designBrief, projectName, systemInstructions, claudeApiKey, showToast]);

  const handleCsvUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCsvFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      
      // Skip header line
      const dataLines = lines.slice(1);
      
      // Parse CSV: Category, Type, User Request
      const prompts = dataLines.map(line => {
        // Simple CSV parsing (handles commas in quotes)
        const parts = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
        const cleanParts = parts.map(p => p.replace(/^"|"$/g, '').trim());
        
        if (cleanParts.length >= 3) {
          const category = cleanParts[0];
          const type = cleanParts[1];
          const request = cleanParts.slice(2).join(','); // In case request has commas
          
          // Format: "Category: X, Type: Y - Request"
          return `Category: ${category}, Type: ${type} - ${request}`;
        }
        return null;
      }).filter(Boolean).join('; ');
      
      setBulkPrompts(prompts);
      showToast(`Loaded ${dataLines.length} prompts from ${file.name}`, 'success');
    };
    
    reader.onerror = () => {
      showToast('Failed to read CSV file', 'error');
    };
    
    reader.readAsText(file);
    
    // Reset file input so same file can be uploaded again
    event.target.value = '';
  }, [showToast]);

  const handleBulkGenerate = useCallback(async () => {
    if (!bulkPrompts.trim()) {
      showToast('Please enter at least one prompt (separated by semicolons)', 'error');
      return;
    }

    const clientSideMode = shouldUseClientSideAPI();
    
    if (!claudeApiKey && clientSideMode) {
      showToast('Please enter your Claude API key', 'error');
      return;
    }

    // Parse prompts (separated by semicolons, ignore empty entries)
    const prompts = bulkPrompts
      .split(';')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (prompts.length === 0) {
      showToast('Please enter at least one valid prompt', 'error');
      return;
    }

    // Reset cancel flag
    bulkCancelRef.current = false;

    setIsBulkGenerating(true);
    setBulkProgress({ current: 0, total: prompts.length });
    setBulkResults([]);
    showToast(`Starting bulk generation of ${prompts.length} components...`, 'info');

    try {
      // Use client-side API if deployed without backend
      if (clientSideMode) {
        const requests = prompts.map(prompt => ({
          prompt,
          designBrief,
          projectName
        }));

        const result = await generateBulkComponents({
          requests,
          designBrief,
          projectName,
          systemInstructions,
          apiKey: claudeApiKey,
          onProgress: (progress) => {
            // Check for cancel before processing progress
            if (bulkCancelRef.current) {
              showToast(`Cancelled. Kept ${progress.current - 1} generated components.`, 'info');
              return 'cancel'; // Signal to stop generation
            }
            
            if (progress.status === 'generating' || progress.status === 'completed') {
              setBulkProgress({ current: progress.current, total: progress.total });
            }
            
            if (progress.status === 'completed' && progress.result) {
              // Auto-load each component as it completes
              const newTab = {
                id: nextTabId + progress.current - 1,
                name: `Component ${nextTabId + progress.current - 1}`,
                code: progress.result.code,
                manifest: null,
                config: {},
                sections: [{ 
                  id: `section-${Date.now()}-${progress.current}`, 
                  code: progress.result.code, 
                  config: {}, 
                  padding: '0px' 
                }]
              };
              
              setTabs(prev => [...prev, newTab]);
              setActiveTabId(newTab.id);
              setNextTabId(prev => prev + 1);
            }
          }
        });

        setBulkResults(result.results);
        showToast(
          `Generated ${result.totalGenerated}/${result.totalRequests} components!` +
          (result.totalFailed > 0 ? ` ${result.totalFailed} failed.` : ''),
          result.totalFailed === 0 ? 'success' : 'warning'
        );
        
        setShowEditor(false);
        
      } else {
        // Use backend API (local development)
        const response = await fetch(getApiEndpoint(API_ENDPOINTS.CLAUDE_BULK_STREAM), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: prompts.map(prompt => ({
              prompt,
              designBrief: designBrief,
              projectName: projectName
            })),
            systemInstructions: systemInstructions,
            apiKey: claudeApiKey
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Process Server-Sent Events
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          
          // Check if user cancelled
          if (bulkCancelRef.current) {
            reader.cancel();
            const componentsKept = bulkProgress.current || tabs.length - 1;
            setIsBulkGenerating(false);
            setBulkProgress({ current: 0, total: 0 });
            setShowEditor(false);
            showToast(`✅ Cancelled. ${componentsKept} components saved to library & tabs!`, 'success');
            break;
          }
          
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop(); // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));

              if (data.type === 'progress') {
                setBulkProgress({ current: data.current, total: data.total });
              } else if (data.type === 'success') {
                // Load each component immediately as it's generated
                const result = data.result;
                const componentName = result.name || `Generated ${result.index + 1}`;
                
                const newTab = {
                  id: nextTabId,
                  name: componentName,
                  code: result.code,
                  manifest: null,
                  config: {},
                  prompt: result.prompt,
                  projectName: projectName,
                  designBrief: designBrief,
                  sections: [{ 
                    id: `section-${Date.now()}-${result.index}`, 
                    code: result.code, 
                    config: {}, 
                    padding: '0px' 
                  }]
                };
                
                setTabs(prev => [...prev, newTab]);
                setActiveTabId(newTab.id);
                setNextTabId(prev => prev + 1);
                
                // 🔥 AUTO-SAVE TO LIBRARY
                const libraryComponent = {
                  id: `component_${Date.now()}_${result.index}`,
                  name: componentName,
                  code: result.code,
                  manifest: null,
                  config: {},
                  timestamp: new Date().toISOString(),
                  projectName: projectName,
                  prompt: result.prompt,
                  designBrief: designBrief
                };
                
                setSavedComponents(prev => {
                  const updated = [libraryComponent, ...prev];
                  localStorage.setItem('customComponents_library', JSON.stringify(updated));
                  return updated;
                });
                
                showToast(`${componentName} generated & saved!`, 'success');
              } else if (data.type === 'complete') {
                setBulkResults(data.results);
                
                showToast(
                  `Generated ${data.totalGenerated}/${data.totalRequests} components!` +
                  (data.totalFailed > 0 ? ` ${data.totalFailed} failed.` : ''),
                  data.totalFailed === 0 ? 'success' : 'warning'
                );

                // Auto-load successful results as tabs
                if (data.results.length > 0) {
                  let newTabId = nextTabId;
                  const newTabs = [...tabs];
                  
                  data.results.forEach((result, index) => {
                    newTabs.push({
                      id: newTabId,
                      name: `Component ${newTabId}`,
                      code: result.code,
                      manifest: null,
                      config: {},
                      sections: [{ id: `section-${Date.now()}-${index}`, code: result.code, config: {}, padding: '0px' }]
                    });
                    newTabId++;
                  });
                  
                  setTabs(newTabs);
                  setActiveTabId(newTabs[newTabs.length - 1].id);
                  setNextTabId(newTabId);
                  addToHistory({ tabs: newTabs, activeTabId: newTabs[newTabs.length - 1].id });
                  setShowEditor(false);
                }
              }
            }
          }
        }
      }

    } catch (err) {
      console.error('Bulk generation error:', err);
      showToast('Bulk generation failed: ' + err.message, 'error');
    } finally {
      setIsBulkGenerating(false);
      setBulkProgress({ current: 0, total: 0 });
    }
  }, [bulkPrompts, designBrief, projectName, systemInstructions, claudeApiKey, csvFileName, showToast, tabs, nextTabId, addToHistory]);

  // Regular functions (non-callbacks)
  const devicePresets = {
    mobile: { width: 390, height: 'auto', label: 'Mobile' },
    tablet: { width: 768, height: 'auto', label: 'Tablet' },
    desktop: { width: 1280, height: 'auto', label: 'Desktop' }
  };

  const handleDeviceSwitch = (mode) => {
    setViewportMode(mode);
    if (mode !== 'custom') {
      setCanvasSize(devicePresets[mode]);
    }
  };

  const handleSliderChange = (width) => {
    setViewportMode('custom');
    setCanvasSize({ width, height: 'auto' });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(200, prev + 10));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(50, prev - 10));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const handleSaveCode = () => {
    const blob = new Blob([editorCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `component-${activeTab.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Code saved', 'success');
  };

  const handleAddTab = () => {
    const newTab = {
      id: nextTabId,
      name: `Component ${nextTabId}`,
      code: '',
      manifest: null,
      config: {}
    };
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    setActiveTabId(nextTabId);
    setNextTabId(nextTabId + 1);
    setEditorCode(defaultCode);
    addToHistory({ tabs: newTabs, activeTabId: nextTabId });
  };

  const handleCloseTab = (tabId) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
    addToHistory({ tabs: newTabs, activeTabId: newTabs[0].id });
  };

  // Handle component error - close the tab with broken component
  const handleComponentError = (tabId) => {
    handleCloseTab(tabId);
    showToast('Broken component removed', 'success');
  };

  const handleTabSwitch = (tabId) => {
    setActiveTabId(tabId);
    const tab = tabs.find(t => t.id === tabId);
    setEditorCode(tab.code || defaultCode);
  };

  const handleConfigChange = (key, value) => {
    const newTabs = tabs.map(tab => {
      if (tab.id !== activeTabId) return tab;
      if (tab.sections && Array.isArray(tab.sections)) {
        const newSections = tab.sections.map((sec, idx) => idx === activeSectionIndex ? { ...sec, config: { ...sec.config, [key]: value } } : sec);
        return { ...tab, sections: newSections, config: { ...tab.config, [key]: value } };
      }
      return { ...tab, config: { ...tab.config, [key]: value } };
    });
    setTabs(newTabs);
    addToHistory({ tabs: newTabs, activeTabId });
  };

  const handleSectionPaddingChange = (value) => {
    const newTabs = tabs.map(tab => {
      if (tab.id !== activeTabId) return tab;
      if (tab.sections && Array.isArray(tab.sections)) {
        const newSections = tab.sections.map((sec, idx) => 
          idx === activeSectionIndex ? { ...sec, padding: value } : sec
        );
        return { ...tab, sections: newSections };
      }
      return tab;
    });
    setTabs(newTabs);
    addToHistory({ tabs: newTabs, activeTabId });
  };

  // Capture thumbnail of current canvas
  const [isCapturingThumbnail, setIsCapturingThumbnail] = useState(false);

  const handleCaptureThumbnail = async () => {
    if (!canvasWrapperRef.current || !activeTab) {
      showToast('No component to capture', 'error');
      return;
    }

    setIsCapturingThumbnail(true);
    
    try {
      // Temporarily reset zoom for clean capture
      const originalZoom = zoomLevel;
      const zoomResetNeeded = zoomLevel !== 100;
      
      if (zoomResetNeeded) {
        canvasWrapperRef.current.style.transform = 'scale(1)';
      }

      // Small delay to let the DOM update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the canvas
      const canvas = await html2canvas(canvasWrapperRef.current, {
        backgroundColor: theme.base1,
        scale: 0.5, // Lower resolution for thumbnails (faster, smaller file)
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: canvasSize.width,
        height: Math.min(canvasWrapperRef.current.scrollHeight, 1200) // Limit height
      });

      // Restore zoom
      if (zoomResetNeeded) {
        canvasWrapperRef.current.style.transform = `scale(${originalZoom / 100})`;
      }

      // Convert to data URL
      const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);

      // Update active tab with thumbnail
      const newTabs = tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, thumbnail: thumbnailDataUrl }
          : tab
      );
      
      setTabs(newTabs);
      addToHistory({ tabs: newTabs, activeTabId });

      // Also save to library if it exists
      const libraryComponents = JSON.parse(localStorage.getItem('componentLibrary') || '[]');
      const updatedLibrary = libraryComponents.map(comp => {
        if (comp.code === activeTab.code) {
          return { ...comp, thumbnail: thumbnailDataUrl };
        }
        return comp;
      });
      localStorage.setItem('componentLibrary', JSON.stringify(updatedLibrary));

      showToast('Thumbnail captured!', 'success');
    } catch (error) {
      console.error('Thumbnail capture error:', error);
      showToast('Failed to capture thumbnail', 'error');
    } finally {
      setIsCapturingThumbnail(false);
    }
  };

  const handleRenderComponent = () => {
    try {
      setError(null);
      
      const manifestMatch = editorCode.match(/const\s+MANIFEST\s*=\s*({[\s\S]*?});/);
      if (!manifestMatch) {
        throw new Error('No MANIFEST found');
      }
      
      const manifestObj = eval('(' + manifestMatch[1] + ')');
      
      const componentDisplayName = manifestObj.editorElement?.displayName || 
                                     manifestObj.type?.split('.').pop() || 
                                     `Component ${activeTabId}`;
      
      const defaults = {};
      if (manifestObj.editorElement && manifestObj.editorElement.data) {
        Object.keys(manifestObj.editorElement.data).forEach(key => {
          defaults[key] = manifestObj.editorElement.data[key].defaultValue;
        });
      }
      
      const componentMatch = editorCode.match(/function Component\s*\(\s*{[\s\S]*?}\s*\)\s*{[\s\S]*?^}/m);
      if (!componentMatch) {
        throw new Error('No Component function found');
      }
      
      const timestamp = new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const promptComment = `/*
 * ============================================================================
 * COMPONENT GENERATION METADATA
 * ============================================================================
 * Project: ${projectName}
 * Generated: ${timestamp}
 * Component Type: ${manifestObj.type || 'Unknown'}
 * 
 * User Request: ${userPrompt || 'No prompt provided'}
 * 
 * Design Brief:
 * ${designBrief || 'No design brief provided'}
 * ============================================================================
 */

`;
      
      const codeWithComment = promptComment + editorCode;
      
      const newTabs = tabs.map(tab => {
        if (tab.id !== activeTabId) return tab;
        
        if (tab.sections && Array.isArray(tab.sections) && tab.sections.length > 0) {
          const newSections = tab.sections.map((sec, idx) => 
            idx === activeSectionIndex 
              ? { ...sec, code: codeWithComment, config: defaults, padding: sec.padding || '0px' }
              : sec
          );
          return {
              ...tab, 
            name: componentDisplayName,
            sections: newSections,
              code: codeWithComment, 
              manifest: manifestObj, 
              config: defaults,
              projectName: projectName,
              prompt: userPrompt,
              designBrief: designBrief,
              timestamp: timestamp
          };
        } else {
          return {
            ...tab,
            name: componentDisplayName,
            code: codeWithComment,
            manifest: manifestObj,
            config: defaults,
            sections: [{ id: `sec_${Date.now()}`, code: codeWithComment, config: defaults, padding: '0px' }],
            projectName: projectName,
            prompt: userPrompt,
            designBrief: designBrief,
            timestamp: timestamp
          };
        }
      });
      
      setTabs(newTabs);
      addToHistory({ tabs: newTabs, activeTabId });
      
      setUserPrompt('');
      setDesignBrief('');
      setShowEditor(false);
      showToast(`Component loaded: ${componentDisplayName}`, 'success');
      
    } catch (err) {
      setError(err.message);
      showToast('Failed to load', 'error');
    }
  };

  // useEffect hooks
  useEffect(() => {
    try {
      const snapshot = buildSnapshot();
      sessionStorage.setItem(LAST_WORKING_KEY, JSON.stringify(snapshot));
    } catch (e) {}
  }, [buildSnapshot]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const snapshot = buildSnapshot();
        sessionStorage.setItem(LAST_WORKING_KEY, JSON.stringify(snapshot));
      } catch (e) {}
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [buildSnapshot]);

  useEffect(() => {
    updateScrollbarThumb();
    const onResize = () => updateScrollbarThumb();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateScrollbarThumb]);

  useEffect(() => {
    if (!autoSaveEnabled) return;
    
    const autoSaveTimer = setTimeout(() => {
      try {
        const saveData = {
          projectName,
          tabs,
          activeTabId,
          canvasSize,
          viewportMode,
          zoomLevel,
          responsiveMode,
          fixedSectionMode,
          selectedFont,
          timestamp: Date.now()
        };
        localStorage.setItem('customComponents_autoSave', JSON.stringify(saveData));
      } catch (err) {
        console.error('Auto-save failed:', err);
      }
    }, 5000);

    return () => clearTimeout(autoSaveTimer);
  }, [tabs, activeTabId, projectName, canvasSize, viewportMode, zoomLevel, responsiveMode, fixedSectionMode, selectedFont, autoSaveEnabled]);

  useEffect(() => {
    try {
      const lastWorking = sessionStorage.getItem(LAST_WORKING_KEY);
      if (lastWorking) {
        const lw = JSON.parse(lastWorking);
        if (lw && lw.tabs && lw.activeTabId) {
          setProjectName(lw.projectName);
          setTabs(lw.tabs);
          setActiveTabId(lw.activeTabId);
          setCanvasSize(lw.canvasSize);
          setViewportMode(lw.viewportMode);
          setZoomLevel(lw.zoomLevel);
          setResponsiveMode(lw.responsiveMode || false);
          setFixedSectionMode(lw.fixedSectionMode || false);
          setSelectedFont(lw.selectedFont || 'system');
          showToast('Restored last working session', 'info');
          return;
        }
      }

      const saved = localStorage.getItem('customComponents_autoSave');
      if (saved) {
        const data = JSON.parse(saved);
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
          setProjectName(data.projectName);
          setTabs(data.tabs);
          setActiveTabId(data.activeTabId);
          setCanvasSize(data.canvasSize);
          setViewportMode(data.viewportMode);
          setZoomLevel(data.zoomLevel);
          setResponsiveMode(data.responsiveMode || false);
          setFixedSectionMode(data.fixedSectionMode || false);
          setSelectedFont(data.selectedFont || 'system');
          showToast('Auto-saved project restored', 'info');
        }
      }
    } catch (err) {
      console.error('Failed to load auto-save:', err);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        handleRedo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleExportProject();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        handleDuplicateTab();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        setShowEditor(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        setShowLibrary(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'g') {
        e.preventDefault();
        setShowGrid(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        setShowRuler(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault();
        handleAddTab();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleExportProject, handleDuplicateTab]);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error('App crashed:', error, errorInfo);
      setHasError(true);
      setErrorInfo(error.message);
      
      setTimeout(() => {
        setHasError(false);
        setErrorInfo(null);
        try {
          const saved = localStorage.getItem('customComponents_autoSave');
          if (saved) {
            const data = JSON.parse(saved);
            setProjectName(data.projectName);
            setTabs(data.tabs);
            setActiveTabId(data.activeTabId);
            setCanvasSize(data.canvasSize);
            setViewportMode(data.viewportMode);
            setZoomLevel(data.zoomLevel);
            setResponsiveMode(data.responsiveMode || false);
            setFixedSectionMode(data.fixedSectionMode || false);
            setSelectedFont(data.selectedFont || 'system');
            showToast('Recovered from crash', 'success');
          }
        } catch (err) {
          console.error('Recovery failed:', err);
        }
      }, 2000);
    };

    window.addEventListener('error', (e) => errorHandler(e.error, e));
    window.addEventListener('unhandledrejection', (e) => errorHandler(e.reason, e));

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, [showToast]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('customComponents_library');
      if (saved) {
        setSavedComponents(JSON.parse(saved));
      }
      
      const savedSessions = localStorage.getItem('customComponents_sessions');
      if (savedSessions) {
        setSessions(JSON.parse(savedSessions));
      }
    } catch (err) {
      console.error('Failed to load library:', err);
    }
  }, []);

  useEffect(() => {
    if (activeTab && activeTab.code) {
      const autoSaveTab = setTimeout(() => {
        const updatedTabs = tabs.map(tab =>
          tab.id === activeTabId ? { ...tab, lastModified: Date.now() } : tab
        );
        setTabs(updatedTabs);
      }, 1000);
      
      return () => clearTimeout(autoSaveTab);
    }
  }, [activeTab?.config]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const extractMetadata = (code) => {
      const metadataMatch = code.match(/\/\*[\s\S]*?COMPONENT GENERATION METADATA[\s\S]*?\*\//);
      
      if (metadataMatch) {
        const metadataBlock = metadataMatch[0];
        
        const projectMatch = metadataBlock.match(/\*\s*Project:\s*(.+)/);
        if (projectMatch) {
          setProjectName(projectMatch[1].trim());
        }
        
        const requestMatch = metadataBlock.match(/\*\s*User Request:\s*(.+)/);
        if (requestMatch) {
          setUserPrompt(requestMatch[1].trim());
        }
        
        const briefMatch = metadataBlock.match(/\*\s*Design Brief:\s*\n\s*\*\s*([\s\S]*?)\n\s*\*\s*={3,}/);
        if (briefMatch) {
          const cleanBrief = briefMatch[1]
            .split('\n')
            .map(line => line.replace(/^\s*\*\s*/, ''))
            .join('\n')
            .trim();
          setDesignBrief(cleanBrief);
        }
      }
    };

    extractMetadata(editorCode);
  }, [editorCode]);

  // Show error recovery screen
  if (hasError) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.base1,
        flexDirection: 'column',
        gap: '20px'
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={theme.text2} strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
        <div style={{ textAlign: 'center', color: theme.text1 }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>App Crashed</h2>
          <p style={{ fontSize: '14px', color: theme.text3 }}>Recovering your work...</p>
          {errorInfo && (
            <p style={{ fontSize: '12px', color: theme.text3, marginTop: '12px', maxWidth: '400px' }}>
              {errorInfo}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ backgroundColor: theme.base1, display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=boska@200,300,400,500,700,900&f[]=switzer@100,200,300,400,500,600,700,800,900&f[]=satoshi@300,400,500,700,900&f[]=general-sans@200,300,400,500,600,700&f[]=epilogue@100,200,300,400,500,600,700,800,900&f[]=clash-display@200,300,400,500,600,700&display=swap');
        
        html, body {
          overflow: hidden !important;
          height: 100vh;
        }
        
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .tooltip {
          position: relative;
        }
        
        .tooltip-text {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 12px;
          background-color: ${theme.isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(60, 60, 60, 0.95)'};
          color: #FFFFFF;
          padding: 6px 12px;
          borderRadius: 6px;
          fontSize: 12px;
          white-space: nowrap;
          z-index: 10001;
          pointer-events: none;
          transition: opacity 200ms ease-out, visibility 200ms ease-out;
        }
        
        .tooltip:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }
        
        .tooltip-text::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: ${theme.isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(60, 60, 60, 0.95)'};
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Left Sidebar */}
      <div 
        style={{
          width: '56px',
          backgroundColor: theme.base2,
          borderRight: `1px solid ${theme.border}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 0',
          gap: '8px',
          transition: 'width 300ms ease-out',
          zIndex: 100
        }}
      >
        {/* Library Button */}
        <div className="tooltip">
          <button
            onClick={() => setShowLibrary(true)}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: showLibrary ? theme.shade1 : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => !showLibrary && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => !showLibrary && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="12" height="12" rx="2"/>
              <path d="M2 6h12M6 2v12"/>
            </svg>
          </button>
          <span className="tooltip-text">Library (⌘L)</span>
        </div>

        {/* Save to Library Button */}
        <div className="tooltip">
          <button
            onClick={handleSaveToLibrary}
            disabled={!activeTab || !activeTab.code}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: (activeTab && activeTab.code) ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              opacity: (activeTab && activeTab.code) ? 1 : 0.4,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => (activeTab && activeTab.code) && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2v8M5 7l3 3 3-3"/>
              <path d="M2 12h12"/>
            </svg>
          </button>
          <span className="tooltip-text">Save to Library</span>
        </div>

        {/* Sessions Button */}
        <div className="tooltip">
          <button
            onClick={() => setShowSessions(true)}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: showSessions ? theme.shade1 : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => !showSessions && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => !showSessions && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6"/>
              <path d="M8 4v4l3 2"/>
            </svg>
          </button>
          <span className="tooltip-text">Sessions History</span>
        </div>

        {/* Save Session Button */}
        <div className="tooltip">
          <button
            onClick={handleSaveSession}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2H4a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2z"/>
              <path d="M10 2v4H6V2"/>
              <circle cx="8" cy="10" r="1.5"/>
            </svg>
          </button>
          <span className="tooltip-text">Save Session</span>
        </div>

        {/* Divider */}
        <div style={{ width: '24px', height: '1px', backgroundColor: theme.border, margin: '8px 0' }} />

        {/* Undo Button */}
        <div className="tooltip">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: canUndo ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              opacity: canUndo ? 1 : 0.4,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => canUndo && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8h8M4 8l3-3M4 8l3 3"/>
            </svg>
          </button>
          <span className="tooltip-text">Undo (⌘Z)</span>
        </div>

        {/* Redo Button */}
        <div className="tooltip">
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: canRedo ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              opacity: canRedo ? 1 : 0.4,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => canRedo && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8H4M12 8l-3-3M12 8l-3 3"/>
            </svg>
          </button>
          <span className="tooltip-text">Redo (⌘⇧Z)</span>
        </div>

        {/* Divider */}
        <div style={{ width: '24px', height: '1px', backgroundColor: theme.border, margin: '8px 0' }} />

        {/* Import Button */}
        <div className="tooltip">
          <label
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 12V4M8 4L5 7M8 4l3 3M3 13h10"/>
            </svg>
            <input
              type="file"
              accept=".json"
              onChange={handleImportProject}
              style={{ display: 'none' }}
            />
          </label>
          <span className="tooltip-text">Import Project</span>
        </div>

        {/* Export Button */}
        <div className="tooltip">
          <button
            onClick={handleExportProject}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 4v8M8 12l-3-3M8 12l3-3M3 3h10"/>
            </svg>
          </button>
          <span className="tooltip-text">Export (⌘S)</span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Grid Button */}
        <div className="tooltip">
          <button
            onClick={() => setShowGrid(prev => !prev)}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: showGrid ? theme.shade1 : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => !showGrid && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => !showGrid && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2h12v12H2zM2 8h12M8 2v12"/>
            </svg>
          </button>
          <span className="tooltip-text">Grid (⌘G)</span>
        </div>

        {/* Ruler Button */}
        <div className="tooltip">
          <button
            onClick={() => setShowRuler(prev => !prev)}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: showRuler ? theme.shade1 : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => !showRuler && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => !showRuler && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="12" height="3"/>
              <path d="M4 5v2M6 5v1M8 5v2M10 5v1M12 5v2"/>
            </svg>
          </button>
          <span className="tooltip-text">Ruler (⌘R)</span>
        </div>

        {/* Screenshot Button */}
        <div className="tooltip">
          <button
            onClick={handleScreenshot}
            disabled={isCapturingScreenshot}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: isCapturingScreenshot ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text2,
              opacity: isCapturingScreenshot ? 0.5 : 1,
              transition: 'background-color 150ms ease-out'
            }}
            onMouseEnter={(e) => !isCapturingScreenshot && (e.currentTarget.style.backgroundColor = theme.shade1)}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="10" rx="1"/>
              <circle cx="8" cy="8" r="2"/>
            </svg>
          </button>
          <span className="tooltip-text">Screenshot {isCapturingScreenshot ? '(Capturing...)' : ''}</span>
        </div>
      </div>

{/* Component Library Panel - KEEPING AS IS FROM YOUR CODE */}
      {showLibrary && (
        <>
          <div 
            className="editor-overlay" 
            onClick={() => setShowLibrary(false)}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
              zIndex: 9999
            }}
          />
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              maxWidth: '1000px',
              height: '85vh',
              backgroundColor: theme.base1,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000
            }}
          >
            <div style={{ 
              padding: '24px',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '20px',
                  fontWeight: '500',
                  color: theme.text1,
                  margin: 0,
                  marginBottom: '4px'
                }}>Component Library</h2>
                <p style={{ 
                  fontSize: '13px',
                  color: theme.text3,
                  margin: 0
                }}>
                  {savedComponents.length} saved component{savedComponents.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button 
                onClick={() => setShowLibrary(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2,
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4L4 12M4 4l8 8"/>
                </svg>
              </button>
            </div>
            
            <div style={{ 
              flex: 1,
              overflowY: 'auto',
              padding: '24px'
            }}>
              {/* My Components Section */}
              <div>
                <h3 style={{ 
                  fontSize: '12px',
                  fontWeight: '500',
                  color: theme.text3,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}>My Components</h3>
                
                {savedComponents.length === 0 ? (
                  <div style={{
                    padding: '60px 20px',
                    textAlign: 'center',
                    color: theme.text3,
                    fontSize: '14px',
                    backgroundColor: theme.base2,
                    borderRadius: '8px',
                    border: `1px dashed ${theme.border}`
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 16px' }}>
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M12 8v8M8 12h8"/>
                    </svg>
                    <p style={{ marginBottom: '8px' }}>No saved components yet</p>
                    <p style={{ fontSize: '12px', opacity: 0.7 }}>
                      Create a component and click "Save to Library"
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    {savedComponents.map(component => (
                      <div
                        key={component.id}
                        style={{
                          padding: '16px',
                          backgroundColor: theme.base2,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '8px',
                          transition: 'all 200ms ease-out',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme.shade1;
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = theme.base2;
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div 
                          onClick={() => handleLoadFromSavedLibrary(component)}
                          style={{ cursor: 'pointer', position: 'relative' }}
                        >
                          <div style={{
                            width: '100%',
                            height: '120px',
                            backgroundColor: theme.shade1,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '12px',
                            overflow: 'hidden',
                            position: 'relative',
                            border: `1px solid ${theme.shade2}`
                          }}>
                            {component.thumbnail ? (
                              <img 
                                src={component.thumbnail}
                                alt={component.name}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  objectPosition: 'top'
                                }}
                              />
                            ) : (
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                color: theme.text3
                              }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                                  <path d="M9 9h.01M21 15l-5-5L5 21"/>
                                </svg>
                                <span style={{ fontSize: '11px' }}>No preview</span>
                              </div>
                            )}
                            
                            {/* Delete button inside preview */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFromLibrary(component.id);
                              }}
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(0, 0, 0, 0.6)',
                                backdropFilter: 'blur(8px)',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px',
                                cursor: 'pointer',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.8,
                                transition: 'all 0.2s',
                                zIndex: 10
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.9)';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.opacity = '0.8';
                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5"/>
                              </svg>
                            </button>
                          </div>
                          <div style={{ 
                            fontSize: '13px', 
                            fontWeight: '500', 
                            color: theme.text1,
                            marginBottom: '4px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {component.name}
                          </div>
                          <div style={{ 
                            fontSize: '11px', 
                            color: theme.text3
                          }}>
                            {new Date(component.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sessions History Panel */}
      {showSessions && (
        <>
          <div 
            className="editor-overlay" 
            onClick={() => setShowSessions(false)}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
              zIndex: 9999
            }}
          />
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              maxHeight: '80vh',
              backgroundColor: theme.base1,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000
            }}
          >
            <div style={{ 
              padding: '24px',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '20px',
                  fontWeight: '500',
                  color: theme.text1,
                  margin: 0,
                  marginBottom: '4px'
                }}>Session History</h2>
                <p style={{ 
                  fontSize: '13px',
                  color: theme.text3,
                  margin: 0
                }}>
                  {sessions.length > 0 ? `${sessions.length} saved session${sessions.length > 1 ? 's' : ''}` : 'No saved sessions'}
                </p>
              </div>
              <button 
                onClick={() => setShowSessions(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4L4 12M4 4l8 8"/>
                </svg>
              </button>
            </div>
            
            <div style={{ 
              padding: '24px',
              overflowY: 'auto',
              flex: 1
            }}>
              {sessions.length === 0 ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: theme.text3,
                  fontSize: '13px'
                }}>
                  <p>No saved sessions yet.</p>
                  <p style={{ marginTop: '8px', fontSize: '12px' }}>
                    Click "Save Session" to save your current workspace
                  </p>
                </div>
              ) : (
                sessions.map(session => (
                  <div
                    key={session.id}
                    style={{
                      padding: '16px',
                      marginBottom: '12px',
                      backgroundColor: theme.base2,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      transition: 'all 200ms ease-out'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => handleLoadSession(session)}>
                        <div style={{ 
                          fontSize: '14px', 
                          fontWeight: '500', 
                          color: theme.text1,
                          marginBottom: '6px'
                        }}>
                          {session.name}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          color: theme.text3,
                          marginBottom: '8px'
                        }}>
                          {new Date(session.timestamp).toLocaleString()} • {session.tabs.length} tab{session.tabs.length > 1 ? 's' : ''}
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap'
                        }}>
                          {session.tabs.slice(0, 3).map(tab => (
                            <span
                              key={tab.id}
                              style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                backgroundColor: theme.shade1,
                                borderRadius: '4px',
                                color: theme.text3
                              }}
                            >
                              {tab.name}
                            </span>
                          ))}
                          {session.tabs.length > 3 && (
                            <span style={{ fontSize: '11px', color: theme.text3 }}>
                              +{session.tabs.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(session.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          color: theme.text3,
                          opacity: 0.6
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Editor Panel */}
      {showEditor && (
        <>
          <div 
            className="editor-overlay" 
            onClick={() => setShowEditor(false)}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
              zIndex: 9999
            }}
          />
          
          {/* Loading Overlay */}
          {(isGenerating || isBulkGenerating) && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10001,
              animation: 'fadeIn 200ms ease-out'
            }}>
              <div style={{
                backgroundColor: theme.base1,
                padding: '40px 50px',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                minWidth: '320px'
              }}>
                {/* Animated Spinner */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: `4px solid ${theme.shade2}`,
                  borderTop: `4px solid ${theme.accent1}`,
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                
                {/* Status Text */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: theme.text1,
                    marginBottom: '8px'
                  }}>
                    {isBulkGenerating 
                      ? `Generating ${bulkProgress.current}/${bulkProgress.total} components...`
                      : 'Generating with Claude...'}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: theme.text3
                  }}>
                    This may take 10-15 seconds
                  </div>
                </div>
                
                {/* Progress Bar for Bulk */}
                {isBulkGenerating && bulkProgress.total > 0 && (
                  <>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: theme.shade2,
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${(bulkProgress.current / bulkProgress.total) * 100}%`,
                        height: '100%',
                        backgroundColor: theme.accent1,
                        transition: 'width 500ms ease-out',
                        borderRadius: '3px'
                      }} />
                    </div>
                    
                    {/* Cancel Button */}
                    <button
                      onClick={() => {
                        bulkCancelRef.current = true;
                        showToast(`Cancelling... Keeping ${bulkProgress.current} generated components`, 'info');
                      }}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: 'transparent',
                        color: theme.text2,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 150ms ease-out'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.shade1;
                        e.currentTarget.style.borderColor = theme.text3;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = theme.border;
                      }}
                    >
                      Cancel Remaining
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90vw',
              maxWidth: '1400px',
              height: '90vh',
              backgroundColor: theme.base1,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '20px 24px',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '20px',
                  fontWeight: '500',
                  color: theme.text1,
                  margin: 0,
                  marginBottom: '4px'
                }}>Component Editor</h2>
                <p style={{ 
                  fontSize: '13px',
                  color: theme.text3,
                  margin: 0
                }}>
                  Generate with Claude or paste component code
                </p>
              </div>
              <button 
                onClick={() => setShowEditor(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4L4 12M4 4l8 8"/>
                </svg>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                style={{
                  margin: '16px 24px',
                  padding: '12px 16px',
                  backgroundColor: theme.isDark ? theme.shade2 : '#FEE',
                  color: theme.isDark ? '#FCC' : '#C33',
                  borderRadius: '6px',
                  border: `1px solid ${theme.isDark ? theme.shade3 : '#FCC'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 4.5a.5.5 0 011 0v3a.5.5 0 01-1 0v-3zM8 11a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Two Column Layout */}
            <div style={{ 
              flex: 1,
              display: 'flex',
              overflow: 'hidden'
            }}>
              {/* LEFT COLUMN: Claude Generation */}
              <div style={{
                width: '45%',
                borderRight: `1px solid ${theme.border}`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '16px 24px',
              borderBottom: `1px solid ${theme.border}`,
              backgroundColor: theme.base2
            }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: theme.text1,
                      margin: 0,
                    letterSpacing: '0.02em'
                  }}>AI Generation</h3>
                    
                    {/* Bulk Mode Toggle */}
                    <div style={{
                      display: 'flex',
                      backgroundColor: theme.shade1,
                      borderRadius: '6px',
                      padding: '2px',
                      gap: '2px'
                    }}>
                      <button
                        onClick={() => setBulkMode(false)}
                        style={{
                          padding: '4px 12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: !bulkMode ? theme.base1 : 'transparent',
                          color: !bulkMode ? theme.text1 : theme.text3,
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 150ms ease-out',
                          boxShadow: !bulkMode ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                        }}
                      >
                        Single
                      </button>
                      <button
                        onClick={() => setBulkMode(true)}
                        style={{
                          padding: '4px 12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          backgroundColor: bulkMode ? theme.base1 : 'transparent',
                          color: bulkMode ? theme.text1 : theme.text3,
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 150ms ease-out',
                          boxShadow: bulkMode ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                        }}
                      >
                        Bulk
                      </button>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: theme.text3,
                    margin: 0
                  }}>{bulkMode ? 'Generate multiple components at once' : 'Use Claude to generate component code'}</p>
                </div>

                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px 24px'
                }}>
                  {!bulkMode ? (
                    // SINGLE MODE
                    <>
                  {/* Project Name */}
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '500',
                color: theme.text2,
                marginBottom: '8px'
              }}>
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Custom Components V9"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  backgroundColor: theme.base1,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: theme.text1,
                  outline: 'none',
                      marginBottom: '20px'
                }}
              />
              
                  {/* User Request */}
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '500',
                color: theme.text2,
                marginBottom: '8px'
              }}>
                    User Request
              </label>
              <input
                type="text"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="e.g., Create a luxury product card"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  backgroundColor: theme.base1,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: theme.text1,
                  outline: 'none',
                      marginBottom: '20px'
                }}
              />

                  {/* Design Brief */}
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '500',
                color: theme.text2,
                marginBottom: '8px'
              }}>
                    Design Brief
              </label>
              <textarea
                value={designBrief}
                onChange={(e) => setDesignBrief(e.target.value)}
                    placeholder="Paste design brief here..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  backgroundColor: theme.base1,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: theme.text1,
                  outline: 'none',
                  fontFamily: 'inherit',
                      resize: 'vertical',
                      marginBottom: '20px'
                    }}
                  />

                  {/* System Instructions */}
                  <label style={{ 
                    display: 'block', 
                    fontSize: '12px', 
                    fontWeight: '500',
                    color: theme.text2,
                    marginBottom: '8px'
                  }}>
                    System Instructions
                  </label>
                  <textarea
                    value={systemInstructions}
                    onChange={(e) => setSystemInstructions(e.target.value)}
                    placeholder="Define how Claude should generate components..."
                    rows={8}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      backgroundColor: theme.base1,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: theme.text1,
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      marginBottom: '20px'
                    }}
                  />

                  {/* Claude API Key */}
                  <label style={{ 
                    display: 'block', 
                    fontSize: '12px', 
                    fontWeight: '500',
                    color: theme.text2,
                    marginBottom: '8px'
                  }}>
                    Claude API Key
                  </label>
                  <input
                    type="password"
                    value={claudeApiKey}
                    onChange={(e) => setClaudeApiKey(e.target.value)}
                    placeholder="sk-ant-..."
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      backgroundColor: theme.base1,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: theme.text1,
                      outline: 'none',
                      marginBottom: '20px'
                    }}
                  />

                  {/* Generate Button */}
                  <button 
                    onClick={handleGenerateWithClaude}
                    disabled={isGenerating || !claudeApiKey || !userPrompt}
                    style={{
                      width: '100%',
                      padding: '12px 24px',
                      backgroundColor: (!claudeApiKey || !userPrompt || isGenerating) ? theme.shade2 : theme.accent1,
                      color: (!claudeApiKey || !userPrompt || isGenerating) ? theme.text3 : theme.base1,
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: (!claudeApiKey || !userPrompt || isGenerating) ? 'not-allowed' : 'pointer',
                      transition: 'all 150ms ease-out',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isGenerating ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                          <path d="M21 12a9 9 0 11-6.219-8.56"/>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 0a8 8 0 108 8 8 8 0 00-8-8zm3.5 7.5h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3a.5.5 0 011 0v3h3a.5.5 0 010 1z"/>
                        </svg>
                        Generate with Claude
                      </>
                    )}
                  </button>
                    </>
                  ) : (
                    // BULK MODE
                    <>
                      {/* Bulk Prompts Input */}
                      <label style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        color: theme.text2,
                        marginBottom: '8px'
                      }}>
                        Component Prompts (separated by semicolons)
                      </label>
                      
                      {/* CSV Upload Button */}
                      <div style={{ marginBottom: '12px' }}>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleCsvUpload}
                          style={{ display: 'none' }}
                          id="csv-upload"
                        />
                        <label
                          htmlFor="csv-upload"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            backgroundColor: theme.shade1,
                            border: `1px solid ${theme.border}`,
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: theme.text2,
                            cursor: 'pointer',
                            transition: 'all 200ms ease-out'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = theme.shade2;
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = theme.shade1;
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14 10v2.667A1.333 1.333 0 0112.667 14H3.333A1.333 1.333 0 012 12.667V10M11.333 5.333L8 2m0 0L4.667 5.333M8 2v8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {csvFileName ? `Uploaded: ${csvFileName}` : 'Upload CSV File'}
                        </label>
                        <div style={{
                          fontSize: '11px',
                          color: theme.text3,
                          marginTop: '6px'
                        }}>
                          CSV Format: Category, Type, User Request
                </div>
            </div>
            
                      <textarea
                        value={bulkPrompts}
                        onChange={(e) => setBulkPrompts(e.target.value)}
                        placeholder={'Category: Complex Slideshows & Carousels, Type: Cinematic Ken Burns Gallery - Create a photo gallery with smooth zoom animations; Category: Navigation, Type: Mega Menu - Create a dropdown menu with multiple columns; Category: Hero Sections, Type: Video Background Hero - Create a hero section with autoplay video'}
                        rows={12}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          backgroundColor: theme.base1,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          fontSize: '13px',
                          color: theme.text1,
                          outline: 'none',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          marginBottom: '20px'
                        }}
                      />

                      {/* Design Brief (shared) */}
                      <label style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        color: theme.text2,
                        marginBottom: '8px'
                      }}>
                        Design Brief (applies to all)
                      </label>
                      <textarea
                        value={designBrief}
                        onChange={(e) => setDesignBrief(e.target.value)}
                        placeholder="Optional: Shared design guidelines for all components..."
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          backgroundColor: theme.base1,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          fontSize: '13px',
                          color: theme.text1,
                          outline: 'none',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          marginBottom: '20px'
                        }}
                      />

                      {/* System Instructions (shared) */}
                      <label style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        color: theme.text2,
                        marginBottom: '8px'
                      }}>
                        System Instructions (applies to all)
                      </label>
                      <textarea
                        value={systemInstructions}
                        onChange={(e) => setSystemInstructions(e.target.value)}
                        placeholder="Define how Claude should generate components..."
                        rows={8}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          backgroundColor: theme.base1,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          fontSize: '13px',
                          color: theme.text1,
                          outline: 'none',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          marginBottom: '20px'
                        }}
                      />

                      {/* Claude API Key */}
                      <label style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        color: theme.text2,
                        marginBottom: '8px'
                      }}>
                        Claude API Key
                      </label>
                      <input
                        type="password"
                        value={claudeApiKey}
                        onChange={(e) => setClaudeApiKey(e.target.value)}
                        placeholder="sk-ant-... (or set in server)"
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          backgroundColor: theme.base1,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          fontSize: '13px',
                          color: theme.text1,
                          outline: 'none',
                          marginBottom: '20px'
                        }}
                      />

                      {/* Bulk Generate Button */}
                      <button 
                        onClick={handleBulkGenerate}
                        disabled={isBulkGenerating || !bulkPrompts.trim()}
                        style={{
                          width: '100%',
                          padding: '12px 24px',
                          backgroundColor: (!bulkPrompts.trim() || isBulkGenerating) ? theme.shade2 : theme.accent1,
                          color: (!bulkPrompts.trim() || isBulkGenerating) ? theme.text3 : theme.base1,
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: (!bulkPrompts.trim() || isBulkGenerating) ? 'not-allowed' : 'pointer',
                          transition: 'all 150ms ease-out',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          marginBottom: '16px'
                        }}
                      >
                        {isBulkGenerating ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                              <path d="M21 12a9 9 0 11-6.219-8.56"/>
                            </svg>
                            Generating {bulkProgress.current}/{bulkProgress.total}...
                          </>
                        ) : (
                          <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z"/>
                            </svg>
                            Generate {bulkPrompts.split(';').filter(l => l.trim()).length} Components
                          </>
                        )}
                      </button>

                      {/* Bulk Results */}
                      {bulkResults.length > 0 && (
                        <div style={{
                          backgroundColor: theme.shade1,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          padding: '12px',
                          fontSize: '12px'
                        }}>
                          <div style={{ 
                            fontWeight: '500', 
                            color: theme.text1,
                            marginBottom: '8px'
                          }}>
                            ✅ Generated {bulkResults.length} components
                          </div>
                          <div style={{ 
                            color: theme.text3,
                            fontSize: '11px'
                          }}>
                            Total tokens: {bulkResults.reduce((sum, r) => sum + (r.usage?.input_tokens || 0) + (r.usage?.output_tokens || 0), 0).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
            </div>
            
              {/* RIGHT COLUMN: Code Editor */}
              <div style={{
                width: '55%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '16px 24px',
                  borderBottom: `1px solid ${theme.border}`,
                  backgroundColor: theme.base2
                }}>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    color: theme.text1,
                    margin: '0 0 4px 0',
                    letterSpacing: '0.02em'
                  }}>Component Code</h3>
                  <p style={{
                    fontSize: '12px',
                    color: theme.text3,
                    margin: 0
                  }}>Paste or edit component code</p>
                </div>

                {/* Code Editor */}
            <textarea
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
              spellCheck={false}
              placeholder="Paste component code here..."
              style={{
                    flex: 1,
                    padding: '16px',
                backgroundColor: theme.base2,
                color: theme.text1,
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    resize: 'none',
                    overflow: 'auto'
                  }}
                />

                {/* Actions */}
                <div style={{
                  padding: '16px 24px',
                  borderTop: `1px solid ${theme.border}`,
                  backgroundColor: theme.base2,
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: theme.text3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 11.5a.5.5 0 01-1 0v-4a.5.5 0 011 0v4zm0-6a.5.5 0 11-1 0 .5.5 0 011 0z"/>
                    </svg>
                    Will load to Section {activeSectionIndex + 1}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleSaveCode}
                style={{
                        padding: '9px 18px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.border}`,
                        borderRadius: '6px',
                        color: theme.text1,
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 150ms ease-out'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Save Code
              </button>
              <button 
                onClick={() => {
                  setEditorCode(defaultCode);
                  setUserPrompt('');
                  setDesignBrief('');
                }}
                style={{
                        padding: '9px 18px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.border}`,
                        borderRadius: '6px',
                        color: theme.text1,
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 150ms ease-out'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Reset
              </button>
              <button 
                onClick={handleRenderComponent}
                style={{
                        padding: '9px 24px',
                  backgroundColor: theme.accent1,
                  border: 'none',
                        borderRadius: '6px',
                        color: theme.base1,
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 150ms ease-out'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Load Component
              </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Canvas Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Canvas Toolbar */}
        <div 
          style={{
            height: '56px',
            backgroundColor: theme.base2,
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            gap: '16px'
          }}
        >
          {/* Toolbar Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setShowEditor(true)}
              title="Add New Component (⌘E)"
              style={{
                backgroundColor: theme.accent1,
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '8px 14px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 1v12M1 7h12"/>
              </svg>
              <span>Add New</span>
            </button>

            {/* Duplicate - Icon Only */}
            <div className="tooltip">
            <button 
              onClick={handleDuplicateTab}
              title="Duplicate (⌘D)"
              disabled={!activeTab}
              style={{
                  width: '40px',
                  height: '40px',
                backgroundColor: 'transparent',
                border: 'none',
                  borderRadius: '8px',
                  cursor: activeTab ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                color: theme.text2,
                  opacity: activeTab ? 1 : 0.4,
                  transition: 'background-color 150ms ease-out'
              }}
              onMouseEnter={(e) => activeTab && (e.currentTarget.style.backgroundColor = theme.shade1)}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="5" width="8" height="8" rx="1"/>
                  <path d="M3 11V3h8"/>
              </svg>
            </button>
              <span className="tooltip-text">Duplicate (⌘D)</span>
            </div>

            {/* Upload - Icon Only */}
            <input
              type="file"
              id="bulkFileUpload"
              multiple
              accept=".jsx,.js,.txt"
              style={{ display: 'none' }}
              onChange={handleBulkFileUpload}
            />
            <div className="tooltip">
            <button 
              onClick={() => document.getElementById('bulkFileUpload').click()}
                title="Upload JSX Files"
              style={{
                  width: '40px',
                  height: '40px',
                backgroundColor: 'transparent',
                border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.text2,
                  transition: 'background-color 150ms ease-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 10v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2M8 2v8M5 7l3-3 3 3"/>
              </svg>
            </button>
              <span className="tooltip-text">Upload Files</span>
            </div>
            
            {/* Responsive Mode Toggles - Icon Only */}
            <div style={{ 
              marginLeft: '16px',
              paddingLeft: '16px',
              borderLeft: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {/* Responsive Toggle */}
              <div className="tooltip">
              <button 
                onClick={() => setResponsiveMode(!responsiveMode)}
                title="Toggle Responsive Behavior"
                style={{
                    width: '40px',
                    height: '40px',
                  backgroundColor: responsiveMode ? theme.accent1 : 'transparent',
                  border: `1px solid ${responsiveMode ? theme.accent1 : theme.border}`,
                  color: responsiveMode ? theme.base1 : theme.text2,
                    borderRadius: '8px',
                    cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 150ms ease-out',
                    position: 'relative'
                }}
                onMouseEnter={(e) => !responsiveMode && (e.currentTarget.style.backgroundColor = theme.shade1)}
                onMouseLeave={(e) => !responsiveMode && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="10" rx="1"/>
                  <path d="M2 6h12"/>
                </svg>
                  {responsiveMode && (
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '6px',
                      height: '6px',
                      backgroundColor: theme.base1,
                      borderRadius: '50%',
                      boxShadow: `0 0 0 1px ${theme.accent1}`
                    }} />
                  )}
              </button>
                <span className="tooltip-text">Responsive: {responsiveMode ? 'ON' : 'OFF'}</span>
              </div>
              
              {/* Preview Mode Toggle */}
              <div className="tooltip">
              <button 
                onClick={() => setPreviewMode(!previewMode)}
                  title="Toggle Preview Mode"
                style={{
                    width: '40px',
                    height: '40px',
                  backgroundColor: previewMode ? theme.accent1 : 'transparent',
                  border: `1px solid ${previewMode ? theme.accent1 : theme.border}`,
                  color: previewMode ? theme.base1 : theme.text2,
                    borderRadius: '8px',
                    cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 150ms ease-out',
                    position: 'relative'
                }}
                onMouseEnter={(e) => !previewMode && (e.currentTarget.style.backgroundColor = theme.shade1)}
                onMouseLeave={(e) => !previewMode && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/>
                  <circle cx="8" cy="8" r="2"/>
                </svg>
                  {previewMode && (
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '6px',
                      height: '6px',
                      backgroundColor: theme.base1,
                      borderRadius: '50%',
                      boxShadow: `0 0 0 1px ${theme.accent1}`
                    }} />
                  )}
              </button>
                <span className="tooltip-text">Preview: {previewMode ? 'ON' : 'OFF'}</span>
              </div>
              
              {/* Fixed Section Mode Toggle */}
              <div className="tooltip">
              <button 
                onClick={() => setFixedSectionMode(!fixedSectionMode)}
                  title="Toggle Fixed Section Height (100vh)"
                style={{
                    width: '40px',
                    height: '40px',
                  backgroundColor: fixedSectionMode ? theme.accent1 : 'transparent',
                  border: `1px solid ${fixedSectionMode ? theme.accent1 : theme.border}`,
                  color: fixedSectionMode ? theme.base1 : theme.text2,
                    borderRadius: '8px',
                    cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 150ms ease-out',
                    position: 'relative'
                }}
                onMouseEnter={(e) => !fixedSectionMode && (e.currentTarget.style.backgroundColor = theme.shade1)}
                onMouseLeave={(e) => !fixedSectionMode && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="12" height="12" rx="1"/>
                  <path d="M2 8h12M8 2v12"/>
                </svg>
                  {fixedSectionMode && (
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '6px',
                      height: '6px',
                      backgroundColor: theme.base1,
                      borderRadius: '50%',
                      boxShadow: `0 0 0 1px ${theme.accent1}`
                    }} />
                  )}
              </button>
                <span className="tooltip-text">100vh: {fixedSectionMode ? 'ON' : 'OFF'}</span>
              </div>

              {/* Capture Thumbnail Button */}
              <div className="tooltip">
              <button 
                onClick={handleCaptureThumbnail}
                disabled={isCapturingThumbnail || !activeTab?.code}
                title="Capture Thumbnail"
                style={{
                    width: '40px',
                    height: '40px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.border}`,
                  color: isCapturingThumbnail ? theme.text3 : theme.text2,
                    borderRadius: '8px',
                    cursor: isCapturingThumbnail || !activeTab?.code ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 150ms ease-out',
                    position: 'relative',
                    opacity: isCapturingThumbnail || !activeTab?.code ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isCapturingThumbnail && activeTab?.code) {
                    e.currentTarget.style.backgroundColor = theme.shade1;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCapturingThumbnail) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="10" rx="1"/>
                  <circle cx="8" cy="8" r="2"/>
                  <path d="M6 3l1-1h2l1 1"/>
                </svg>
                  {isCapturingThumbnail && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        border: `2px solid ${theme.text3}`,
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite'
                      }} />
                    </div>
                  )}
              </button>
                <span className="tooltip-text">
                  {isCapturingThumbnail ? 'Capturing...' : 'Capture Thumbnail'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Toolbar Center - Device Switcher + Width Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Device Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={() => handleDeviceSwitch('mobile')}
                title="Mobile (390px)"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: viewportMode === 'mobile' ? theme.shade1 : 'transparent',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.text2
                }}
                onMouseEnter={(e) => viewportMode !== 'mobile' && (e.currentTarget.style.backgroundColor = theme.shade1)}
                onMouseLeave={(e) => viewportMode !== 'mobile' && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="2" width="8" height="12" rx="1.5"/>
                  <path d="M7 12.5h2"/>
                </svg>
              </button>
              
              <button 
                onClick={() => handleDeviceSwitch('tablet')}
                title="Tablet (768px)"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: viewportMode === 'tablet' ? theme.shade1 : 'transparent',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.text2
                }}
                onMouseEnter={(e) => viewportMode !== 'tablet' && (e.currentTarget.style.backgroundColor = theme.shade1)}
                onMouseLeave={(e) => viewportMode !== 'tablet' && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="10" rx="1.5"/>
                  <path d="M7 11h2"/>
                </svg>
              </button>
              
              <button 
                onClick={() => handleDeviceSwitch('desktop')}
                title="Desktop (1280px)"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: viewportMode === 'desktop' ? theme.shade1 : 'transparent',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.text2
                }}
                onMouseEnter={(e) => viewportMode !== 'desktop' && (e.currentTarget.style.backgroundColor = theme.shade1)}
                onMouseLeave={(e) => viewportMode !== 'desktop' && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="8" rx="1"/>
                  <path d="M6 14h4M8 11v3"/>
                </svg>
              </button>
            </div>
            
            {/* Width Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: theme.text3, fontWeight: '500' }}>390</span>
              <input
                type="range"
                min="390"
                max="1920"
                step="10"
                value={canvasSize.width}
                onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                style={{
                  width: '200px',
                  height: '4px',
                  borderRadius: '2px',
                  outline: 'none',
                  background: `linear-gradient(to right, ${theme.accent1} 0%, ${theme.accent1} ${((canvasSize.width - 390) / (1920 - 390)) * 100}%, ${theme.shade3} ${((canvasSize.width - 390) / (1920 - 390)) * 100}%, ${theme.shade3} 100%)`,
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '11px', color: theme.text3, fontWeight: '500' }}>1920</span>
              <span style={{ fontSize: '13px', color: theme.text2, fontWeight: '500', marginLeft: '8px' }}>
                {canvasSize.width}px
              </span>
            </div>
          </div>
          
          {/* Toolbar Right - Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={handleZoomOut} 
                title="Zoom Out"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2,
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="7" cy="7" r="5"/>
                  <path d="M11 11l3.5 3.5M5 7h4"/>
                </svg>
              </button>
            
              <span style={{ fontSize: '13px', color: theme.text3, minWidth: '50px', textAlign: 'center' }}>
                {zoomLevel}%
              </span>
            
              <button 
                onClick={handleZoomIn} 
                title="Zoom In"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2,
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="7" cy="7" r="5"/>
                  <path d="M11 11l3.5 3.5M7 5v4M5 7h4"/>
                </svg>
              </button>
            
              <button 
                onClick={handleZoomReset} 
                title="Reset Zoom"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2,
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8a6 6 0 0112 0M14 8a6 6 0 01-12 0"/>
                </svg>
              </button>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginLeft: '16px',
              paddingLeft: '16px',
              borderLeft: `1px solid ${theme.border}`
            }}>
              <button
                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                title={isPanelCollapsed ? 'Show Properties' : 'Hide Properties'}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  style={{
                    transform: isPanelCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 300ms ease-out'
                  }}
                >
                  <path d="M10 12L6 8l4-4"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div style={{
          backgroundColor: theme.shade1,
          borderBottom: `1px solid ${theme.border}`,
          borderTop: `2px solid ${theme.border}`,
          display: 'flex',
          minWidth: 0,
          flexShrink: 0
        }}>
          {/* Tabs Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '48px',
            minHeight: '48px',
            maxHeight: '48px',
            minWidth: 0,
            flexShrink: 0,
            overflow: 'hidden',
            flex: 1
          }}>
            <div style={{
              flex: 1,
            overflowX: 'auto',
              overflowY: 'hidden',
              minWidth: 0,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme.shade3} transparent`,
              WebkitOverflowScrolling: 'touch'
            }}>
              <div style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                height: '100%',
                minWidth: 'min-content',
                paddingLeft: '12px',
                paddingRight: '12px'
          }}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: activeTabId === tab.id ? theme.base1 : 'transparent',
                      borderTop: activeTabId === tab.id ? `3px solid ${theme.accent1}` : '3px solid transparent',
                      borderLeft: `1px solid ${activeTabId === tab.id ? theme.border : 'transparent'}`,
                      borderRight: `1px solid ${activeTabId === tab.id ? theme.border : 'transparent'}`,
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: activeTabId === tab.id ? theme.text1 : theme.text3,
                  whiteSpace: 'nowrap',
                      transition: 'all 150ms ease',
                      flexShrink: 0,
                      minWidth: 'min-content',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTabId !== tab.id) {
                        e.currentTarget.style.backgroundColor = theme.shade2;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTabId !== tab.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                }}
              >
                {/* Thumbnail indicator */}
                {tab.thumbnail && (
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: theme.accent1,
                    flexShrink: 0
                  }} />
                )}
                
                {editingTabId === tab.id ? (
                  <input
                    type="text"
                    value={tempTabName}
                    onChange={(e) => setTempTabName(e.target.value)}
                    onBlur={() => handleRenameTab(tab.id, tempTabName)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameTab(tab.id, tempTabName);
                      if (e.key === 'Escape') {
                        setEditingTabId(null);
                        setTempTabName('');
                      }
                    }}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      padding: '2px 6px',
                      fontSize: '13px',
                      backgroundColor: theme.base2,
                      border: `1px solid ${theme.accent1}`,
                      borderRadius: '4px',
                      color: theme.text1,
                      outline: 'none',
                      width: '120px'
                    }}
                  />
                ) : (
                  <span
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingTabId(tab.id);
                      setTempTabName(tab.name);
                    }}
                    title="Double-click to rename"
                  >
                    {tab.name}
                  </span>
                )}
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseTab(tab.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit',
                      opacity: 0.6
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 4L4 12M4 4l8 8"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
                
                <button
                  onClick={handleAddTab}
                  title="New Component (⌘T)"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: theme.text2,
                    marginLeft: '8px',
                    marginRight: '8px',
                    transition: 'all 150ms ease-out',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.shade1;
                    e.currentTarget.style.borderColor = theme.accent1;
                    e.currentTarget.style.color = theme.text1;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = theme.border;
                    e.currentTarget.style.color = theme.text2;
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3v10M3 8h10"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        


        
        {/* EDIT MODE - Canvas Wrapper with transform scaling */}
        {!previewMode && (
        <div 
          ref={outerCanvasWrapperRef}
          style={{ 
            padding: '60px 40px 40px 40px',
            overflow: 'hidden',
            backgroundColor: theme.base2,
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
          onWheel={(e) => {
            // Forward wheel events to the inner canvas if it exists
            if (canvasWrapperRef.current && !e.defaultPrevented) {
              e.preventDefault();
              canvasWrapperRef.current.scrollTop += e.deltaY;
              canvasWrapperRef.current.scrollLeft += e.deltaX;
            }
          }}
        >
          {/* Section Controls in Left Sidebar */}
          {sectionMode && activeTab?.sections && activeTab.sections.length > 0 && (
            <div style={{
              position: 'absolute',
              left: '8px',
              top: '60px',
              bottom: '40px',
              width: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '8px 0',
              zIndex: 10
            }}>
              {activeTab.sections.map((section, index) => (
                <div key={section.id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  alignItems: 'center'
                }}>
                  <div 
                    style={{
                      width: index === activeSectionIndex ? '12px' : '8px',
                      height: index === activeSectionIndex ? '12px' : '8px',
                      borderRadius: '50%',
                      backgroundColor: index === activeSectionIndex ? theme.accent1 : theme.shade2,
                      border: index === activeSectionIndex ? `2px solid ${theme.accent1}` : `1px solid ${theme.border}`,
                      cursor: 'pointer',
                      transition: 'all 200ms ease-out',
                      boxShadow: index === activeSectionIndex ? `0 0 0 3px ${theme.accent1}33` : 'none'
                    }} 
                    onClick={() => setActiveSectionIndex(index)} 
                    title={`Section ${index + 1}${section.code ? '' : ' (Empty)'}`}
                  />
                  
                  {index === activeSectionIndex && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                      <button
                        onClick={() => handleMoveSectionUp(index)}
                        disabled={index === 0}
                        style={{ 
                          background: theme.base1, 
                          border: `1px solid ${theme.border}`, 
                          borderRadius: '4px', 
                          padding: '4px', 
                          width: '28px', 
                          height: '24px', 
                          cursor: index === 0 ? 'not-allowed' : 'pointer', 
                          opacity: index === 0 ? 0.5 : 1,
                          fontSize: '10px',
                          color: theme.text2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMoveSectionDown(index)}
                        disabled={index === activeTab.sections.length - 1}
                        style={{ 
                          background: theme.base1, 
                          border: `1px solid ${theme.border}`, 
                          borderRadius: '4px', 
                          padding: '4px', 
                          width: '28px', 
                          height: '24px', 
                          cursor: index === activeTab.sections.length - 1 ? 'not-allowed' : 'pointer', 
                          opacity: index === activeTab.sections.length - 1 ? 0.5 : 1,
                          fontSize: '10px',
                          color: theme.text2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Move down"
                      >
                        ▼
                      </button>
                      <button
                        onClick={() => handleAddSectionAfter(index)}
                        style={{ 
                          background: theme.accent1, 
                          color: theme.base1, 
                          border: 'none', 
                          borderRadius: '4px', 
                          padding: '4px', 
                          width: '28px', 
                          height: '24px', 
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Add section after"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Custom scrollbar track */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '40px',
              bottom: '40px',
              width: '10px',
              borderRadius: '6px',
              background: 'transparent',
              transition: 'opacity 200ms ease-out',
              pointerEvents: 'none',
              opacity: isScrolling && scrollThumb.height > 0 ? 1 : 0
            }}
          />
          
          {/* Custom scrollbar thumb */}
          <div
            style={{
              position: 'absolute',
              top: `${60 + scrollThumb.top}px`,
              right: '40px',
              width: '10px',
              height: `${scrollThumb.height}px`,
              borderRadius: '6px',
              background: theme.isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
              transition: 'opacity 120ms ease-out',
              opacity: isScrolling && scrollThumb.height > 0 ? 1 : 0,
              pointerEvents: 'none'
            }}
          />
          
          {/* Grid Overlay */}
          {showGrid && (
            <div style={{
              position: 'absolute',
              top: '60px',
              left: '50%',
              transform: `translateX(-50%) scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              width: `${canvasSize.width}px`,
              height: 'calc(100% - 100px)',
              pointerEvents: 'none',
              backgroundImage: `
                linear-gradient(${theme.border} 1px, transparent 1px),
                linear-gradient(90deg, ${theme.border} 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              opacity: 0.3,
              zIndex: 100
            }} />
          )}

          {/* Ruler Overlay */}
          {showRuler && (
            <>
              {/* Horizontal Ruler */}
              <div style={{
                position: 'absolute',
                top: '60px',
                left: '50%',
                transform: `translateX(-50%) scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                width: `${canvasSize.width}px`,
                height: '20px',
                backgroundColor: theme.base1,
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                fontSize: '10px',
                color: theme.text3,
                zIndex: 101,
                pointerEvents: 'none'
              }}>
                {Array.from({ length: Math.floor(canvasSize.width / 50) + 1 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${i * 50}px`,
                      width: '50px',
                      height: '100%',
                      borderLeft: `1px solid ${theme.border}`,
                      paddingLeft: '2px',
                      paddingTop: '2px'
                    }}
                  >
                    {i * 50}
                  </div>
                ))}
              </div>

              {/* Vertical Ruler */}
              <div style={{
                position: 'absolute',
                top: '80px',
                left: `calc(50% - ${(canvasSize.width / 2) * (zoomLevel / 100)}px - 20px)`,
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top left',
                width: '20px',
                height: 'calc(100% - 120px)',
                backgroundColor: theme.base1,
                borderRight: `1px solid ${theme.border}`,
                fontSize: '10px',
                color: theme.text3,
                zIndex: 101,
                pointerEvents: 'none'
              }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: `${i * 50}px`,
                      width: '100%',
                      height: '50px',
                      borderTop: `1px solid ${theme.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed'
                    }}
                  >
                    {i * 50}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Canvas Content */}
          <div
            ref={canvasWrapperRef}
            style={{
              width: `${canvasSize.width}px`,
              minWidth: `${canvasSize.width}px`,  // Ensure canvas grows beyond 1280px
              maxWidth: `${canvasSize.width}px`,  // Lock to exact width
            height: 'calc(100vh - 200px)',
            margin: '0 auto',
              transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 200ms ease-out',
            boxShadow: '0 32px 96px rgba(0,0,0,0.28), 0 12px 28px rgba(0,0,0,0.18)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            overflow: 'auto',
            fontFamily: selectedFont === 'system' 
              ? '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
              : selectedFont === 'boska'
              ? '"Boska", Georgia, serif'
              : selectedFont === 'switzer'
              ? '"Switzer", -apple-system, sans-serif'
              : selectedFont === 'satoshi'
              ? '"Satoshi", -apple-system, sans-serif'
              : selectedFont === 'general-sans'
              ? '"General Sans", -apple-system, sans-serif'
              : selectedFont === 'epilogue'
              ? '"Epilogue", -apple-system, sans-serif'
              : selectedFont === 'clash-display'
              ? '"Clash Display", -apple-system, sans-serif'
              : '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
            }}
            onScroll={() => {
              setIsScrolling(true);
              if (canvasWrapperRef.current) {
                setScrollPosition(canvasWrapperRef.current.scrollTop);
              }
              updateScrollbarThumb();
              if (hideScrollbarTimerRef.current) clearTimeout(hideScrollbarTimerRef.current);
              hideScrollbarTimerRef.current = setTimeout(() => setIsScrolling(false), 400);
            }}
          >
            {sectionMode ? (
              <div>
                {(activeTab?.sections && activeTab.sections.length > 0 ? activeTab.sections : [{ id: 'default', code: activeTab?.code, config: activeTab?.config, padding: '0px' }]).map((section, index) => (
                  <section
                    key={section.id}
                    onClick={() => setActiveSectionIndex(index)}
                    style={{
                      minHeight: fixedSectionMode ? '720px' : '100vh',
                      maxHeight: fixedSectionMode ? '720px' : 'none',
                      width: '100%',
                      position: 'relative',
                      isolation: 'isolate',
                      outline: index === activeSectionIndex ? `3px solid ${theme.accent1}` : `1px solid transparent`,
                      cursor: 'pointer',
                      transition: 'outline 200ms ease-out',
                      overflowY: 'visible',
                      overflowX: 'hidden',
                      padding: section.padding || '0px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Section Label */}
                    {index === activeSectionIndex && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        backgroundColor: theme.accent1,
                        color: theme.base1,
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        zIndex: 1000,
                        pointerEvents: 'none'
                      }}>
                        Section {index + 1} (Active)
                      </div>
                    )}
                    
                    {section.code ? (
                      <LiveComponent 
                        code={section.code}
                        config={section.config || {}}
                        responsiveMode={responsiveMode}
                        fixedSectionMode={fixedSectionMode}
                        canvasWidth={canvasSize.width}
                        scrollPosition={scrollPosition}
                        canvasWrapperRef={canvasWrapperRef}
                        onOpenEditor={() => setShowEditor(true)}
                        theme={theme}
                        onComponentError={handleComponentError}
                        tabId={activeTab?.id}
                        componentName={`${activeTab?.label || 'Component'} - Section ${index + 1}`}
                      />
                    ) : (
                      <div style={{
                        minHeight: fixedSectionMode ? '720px' : '60vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.text3,
                        border: `1px dashed ${theme.border}`,
                        margin: '24px',
                        borderRadius: '8px',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <path d="M12 8v8M8 12h8"/>
                        </svg>
                        <p>Empty section — Open editor and load a component here</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
            <LiveComponent 
              code={activeTab?.code || ''} 
              config={activeTab?.config || {}}
              responsiveMode={responsiveMode}
              fixedSectionMode={fixedSectionMode}
              canvasWidth={canvasSize.width}
              scrollPosition={scrollPosition}
              canvasWrapperRef={canvasWrapperRef}
              onOpenEditor={() => setShowEditor(true)}
              theme={theme}
              onComponentError={handleComponentError}
              tabId={activeTab?.id}
              componentName={activeTab?.label || 'Component'}
            />
            )}
          </div>
        </div>
        )}
        
        {/* PREVIEW MODE - Direct render without canvas wrapper */}
        {previewMode && (
        <div 
          style={{ 
            overflow: 'auto',
            backgroundColor: theme.base2,
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{
            width: `${canvasSize.width}px`,
            height: '100%',
            backgroundColor: '#FFFFFF',
            position: 'relative',
            fontFamily: selectedFont === 'system' 
              ? '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
              : selectedFont === 'boska'
              ? '"Boska", Georgia, serif'
              : selectedFont === 'switzer'
              ? '"Switzer", -apple-system, sans-serif'
              : selectedFont === 'satoshi'
              ? '"Satoshi", -apple-system, sans-serif'
              : selectedFont === 'general-sans'
              ? '"General Sans", -apple-system, sans-serif'
              : selectedFont === 'epilogue'
              ? '"Epilogue", -apple-system, sans-serif'
              : selectedFont === 'clash-display'
              ? '"Clash Display", -apple-system, sans-serif'
              : '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
          }}>
            {sectionMode ? (
              <div>
                {(activeTab?.sections && activeTab.sections.length > 0 ? activeTab.sections : [{ id: 'default', code: activeTab?.code, config: activeTab?.config, padding: '0px' }]).map((section, index) => (
                  <section
                    key={section.id}
                    style={{
                      minHeight: fixedSectionMode ? '720px' : '100vh',
                      maxHeight: fixedSectionMode ? '720px' : 'none',
                      width: '100%',
                      position: 'relative',
                      isolation: 'isolate',
                      overflowY: 'visible',
                      overflowX: 'hidden',
                      padding: section.padding || '0px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {section.code ? (
                      <LiveComponent 
                        code={section.code}
                        config={section.config || {}}
                        responsiveMode={false}
                        fixedSectionMode={fixedSectionMode}
                        canvasWidth={canvasSize.width}
                        scrollPosition={0}
                        canvasWrapperRef={null}
                        onOpenEditor={() => setShowEditor(true)}
                        theme={theme}
                        onComponentError={handleComponentError}
                        tabId={activeTab?.id}
                        componentName={`${activeTab?.label || 'Component'} - Section ${index + 1}`}
                      />
                    ) : (
                      <div style={{
                        minHeight: fixedSectionMode ? '720px' : '60vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.text3,
                        fontSize: '14px'
                      }}>
                        Empty section
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
            <LiveComponent 
              code={activeTab?.code || ''} 
              config={activeTab?.config || {}}
              responsiveMode={responsiveMode}
              fixedSectionMode={fixedSectionMode}
              canvasWidth={canvasSize.width}
              scrollPosition={0}
              canvasWrapperRef={null}
              onOpenEditor={() => setShowEditor(true)}
              theme={theme}
              onComponentError={handleComponentError}
              tabId={activeTab?.id}
              componentName={activeTab?.label || 'Component'}
            />
            )}
          </div>
        </div>
        )}
      </div>

      {/* Right Properties Panel */}
      {!previewMode && (
      <div 
        style={{
          width: isPanelCollapsed ? '0px' : '320px',
          minWidth: isPanelCollapsed ? '0px' : '320px',
          maxWidth: isPanelCollapsed ? '0px' : '320px',
          flexShrink: 0,
          transition: 'width 300ms ease-out',
          backgroundColor: theme.base1,
          borderLeft: `1px solid ${theme.border}`,
          overflow: 'hidden'
        }}
      >
        <div style={{ 
          opacity: isPanelCollapsed ? 0 : 1,
          visibility: isPanelCollapsed ? 'hidden' : 'visible',
          transition: 'opacity 300ms ease-out, visibility 300ms ease-out',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
            <div style={{ 
              padding: '20px 24px',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ 
                fontSize: '16px',
                fontWeight: '500',
                color: theme.text1,
                margin: 0
              }}>Properties</h3>
            {activeTab?.manifest && (
                <span style={{ 
                  fontSize: '11px',
                  padding: '4px 8px',
                backgroundColor: theme.shade2,
                  color: theme.text2,
                  borderRadius: '4px'
              }}>
                {activeTab.manifest.editorElement?.data ? Object.keys(activeTab.manifest.editorElement.data).length : 0}
              </span>
            )}
          </div>

          {/* Auto-save indicator */}
          <div style={{
            padding: '8px 16px',
            fontSize: '11px',
            color: theme.text3,
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Auto-save: {autoSaveEnabled ? 'On' : 'Off'}</span>
            <button
              onClick={() => setAutoSaveEnabled(prev => !prev)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: autoSaveEnabled ? theme.accent1 : theme.text3
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8l3 3L13 4" style={{ display: autoSaveEnabled ? 'block' : 'none' }}/>
                <path d="M13 3L3 13M3 3l10 10" style={{ display: autoSaveEnabled ? 'none' : 'block' }}/>
              </svg>
            </button>
          </div>

          {/* Font Selector in Properties Panel */}
          <div style={{
            padding: '12px 16px',
            fontSize: '11px',
            borderBottom: `1px solid ${theme.border}`,
            backgroundColor: theme.base2
          }}>
            <label style={{ 
              display: 'block',
              fontSize: '11px', 
              fontWeight: '500',
              color: theme.text2,
              marginBottom: '8px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Canvas Font
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: theme.base1,
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                fontSize: '13px',
                color: theme.text1,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="system">System Font</option>
              <option value="boska">Boska (Serif)</option>
              <option value="switzer">Switzer (Sans)</option>
              <option value="satoshi">Satoshi (Sans)</option>
              <option value="general-sans">General Sans</option>
              <option value="epilogue">Epilogue (Sans)</option>
              <option value="clash-display">Clash Display</option>
            </select>
          </div>

          {/* Section Padding Control */}
          {sectionMode && activeTab?.sections && activeTab.sections[activeSectionIndex] && (
            <div style={{
              padding: '12px 16px',
              fontSize: '11px',
              borderBottom: `1px solid ${theme.border}`,
              backgroundColor: theme.base2
            }}>
              <label style={{ 
                display: 'block',
                fontSize: '11px', 
                fontWeight: '500',
                color: theme.text2,
                marginBottom: '8px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Section {activeSectionIndex + 1} Padding
              </label>
              <select
                value={activeTab.sections[activeSectionIndex].padding || '0px'}
                onChange={(e) => handleSectionPaddingChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor: theme.base1,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: theme.text1,
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="0px">No Padding</option>
                <option value="20px">Small (20px)</option>
                <option value="40px">Medium (40px)</option>
                <option value="60px">Large (60px)</option>
                <option value="80px">Extra Large (80px)</option>
              </select>
            </div>
          )}

          {activeTab?.manifest?.editorElement?.data ? (
            <div 
              style={{
                overflowY: 'auto',
                  flex: 1,
                  padding: '20px 16px'
              }}
            >
              {(() => {
                const data = activeTab.manifest.editorElement.data;
                const grouped = {};
                
                Object.entries(data).forEach(([key, prop]) => {
                  const group = prop.group || 'General';
                  if (!grouped[group]) grouped[group] = [];
                  grouped[group].push([key, prop]);
                });

                return Object.entries(grouped).map(([groupName, properties], groupIndex) => (
                  <div key={groupName}>
                    {groupIndex > 0 && (
                      <div style={{
                        height: '1px',
                        backgroundColor: theme.border,
                        margin: '24px 0 20px 0'
                      }} />
                    )}
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: theme.text3,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                      paddingLeft: '4px'
                    }}>
                      {groupName}
                    </div>
                    {properties.map(([key, prop]) => (
                      <ControlInput
                        key={key}
                        propertyKey={key}
                        property={prop}
                        value={activeTab.config[key]}
                        onChange={(value) => handleConfigChange(key, value)}
                        theme={theme}
                      />
                    ))}
                  </div>
                ));
              })()}
            </div>
          ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '40px 20px',
                textAlign: 'center'
              }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.text3} strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 9h6M9 15h6"/>
              </svg>
                <p style={{ color: theme.text3, fontSize: '13px' }}>Load a component to view properties</p>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

// LiveComponent - renders the actual component code
function LiveComponent({ code, config, responsiveMode, fixedSectionMode, canvasWidth, scrollPosition, canvasWrapperRef, onOpenEditor, theme, onComponentError, tabId, componentName }) {
  const [Component, setComponent] = useState(null);
  const [renderError, setRenderError] = useState(null);
  const [isBabelLoaded, setIsBabelLoaded] = useState(false);

  useEffect(() => {
    if (window.Babel) {
      setIsBabelLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js';
    script.onload = () => {
      setIsBabelLoaded(true);
    };
    script.onerror = () => {
      setRenderError('Failed to load Babel transpiler');
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isBabelLoaded) return;

    if (!code) {
      setComponent(() => () => <DefaultPlaceholder onOpenEditor={onOpenEditor} theme={theme} />);
      return;
    }

    try {
      const transformed = window.Babel.transform(code, {
        presets: ['react']
      }).code;

      const componentFunc = new Function('React', 'useState', 'useRef', 'useEffect', 'config', 'getScrollContainer', 'useScrollPosition', `
        ${transformed}
        return Component;
      `);

      const CreatedComponent = componentFunc(React, useState, useRef, useEffect, config, window.getScrollContainer, window.useScrollPosition);
      setComponent(() => CreatedComponent);
      setRenderError(null);
    } catch (err) {
      setRenderError(err.message);
      console.error('Component creation error:', err);
    }
  }, [code, config, isBabelLoaded]);

  // Apply responsive wrapper styles for components inside the canvas
  // Canvas is ACTUAL width, but components can scale for responsive testing
  const getResponsiveStyles = () => {
    if (!responsiveMode) {
      // Responsive OFF: Component fills canvas naturally (no scaling)
      return {
        width: '100%',
        height: '100%',
        minHeight: '100%'
      };
    }

    const width = canvasWidth;
    
    // Responsive ON: Scale components based on width ranges
    
    // Range 390-700px: Scale down from 1280px base (test desktop→mobile)
    if (width >= 390 && width <= 700) {
      const scale = width / 1280;
      return {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: '1280px',  // Base design width
        height: 'auto'
      };
    }
    
    // Range 701-1023px: Natural width (tablet - components adapt with CSS)
    if (width >= 701 && width <= 1023) {
      if (fixedSectionMode) {
        // Exception: Scale when 100vh mode is on
        const scale = width / 1280;
        return {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '1280px',
          height: 'auto'
        };
      }
      // Natural adaptation - no scaling
        return {
          width: '100%',
        height: '100%',
        minHeight: '100%'
        };
    }
    
    // Range 1024-1920px: Scale up from 1280px base (test desktop scaling)
    if (width >= 1024 && width <= 1920) {
      const scale = width / 1280;
      return {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: '1280px',  // Base design width
        height: 'auto'
      };
    }
    
    // Range 1921px+: Cap at 1.5x scale
    if (width > 1920) {
      return {
        transform: 'scale(1.5)',
        transformOrigin: 'top left',
        width: '1280px',
        height: 'auto'
      };
    }
    
    // Fallback: Natural width
    return {
      width: '100%',
      height: '100%',
      minHeight: '100%'
    };
  };

  if (renderError) {
    return (
      <div style={{
        padding: '40px',
        backgroundColor: '#FEE',
        color: '#C33',
        borderRadius: '8px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
        <strong>Render Error</strong>
        <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>{renderError}</pre>
      </div>
    );
  }

  if (!isBabelLoaded) {
    return (
      <div style={{
        padding: '60px',
        textAlign: 'center',
        color: '#888',
        fontSize: '14px'
      }}>
        <p>Loading JSX transpiler...</p>
      </div>
    );
  }

  if (!Component) {
    return <DefaultPlaceholder onOpenEditor={onOpenEditor} theme={theme} />;
  }

  return (
    <div 
      style={getResponsiveStyles()}
      data-scroll-container="true"
      data-scroll-position={scrollPosition || 0}
    >
      <ComponentErrorBoundary
        onRemove={() => {
          if (onComponentError) {
            onComponentError(tabId);
          }
        }}
        componentName={componentName}
    >
      <Component config={config} />
      </ComponentErrorBoundary>
    </div>
  );
}

// Default placeholder component
function DefaultPlaceholder({ onOpenEditor, theme }) {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      color: theme.text3,
      fontSize: '14px'
    }}>
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <p style={{ fontSize: '16px', color: theme.text2, marginBottom: '8px', fontWeight: '500' }}>
          No component loaded
        </p>
        <p style={{ fontSize: '13px', color: theme.text3 }}>
          Click the button below to open the editor and create your first component
        </p>
      </div>
      <button
        onClick={onOpenEditor}
        style={{
          padding: '12px 24px',
          backgroundColor: theme.accent1,
          color: theme.base1,
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 150ms ease-out',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 3v10M3 8h10"/>
        </svg>
        Open Editor & Create Component
      </button>
    </div>
  );
}

// ControlInput component for property editing
function ControlInput({ propertyKey, property, value, onChange, theme }) {
  const { dataType, displayName, options } = property;

  const handleChange = (e) => {
    let newValue;
    if (dataType === 'booleanValue') {
      newValue = e.target.checked;
    } else if (dataType === 'number') {
      newValue = parseInt(e.target.value) || 0;
    } else {
      newValue = e.target.value;
    }
    onChange(newValue);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ 
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: theme.text2,
        marginBottom: '8px'
      }}>{displayName}</label>
      
      {dataType === 'text' && !options && (
        <input
          type="text"
          value={value || ''}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: theme.base2,
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '13px',
            color: theme.text1,
            outline: 'none'
          }}
        />
      )}

      {dataType === 'color' && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="color"
            value={value || '#000000'}
            onChange={handleChange}
            style={{
              width: '48px',
              height: '32px',
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          />
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            placeholder="#000000"
            style={{ 
              flex: 1,
              padding: '8px 12px',
              backgroundColor: theme.base2,
              border: `1px solid ${theme.border}`,
              borderRadius: '6px',
              fontSize: '13px',
              color: theme.text1,
              outline: 'none'
            }}
          />
        </div>
      )}

      {dataType === 'select' && options && (
        <select
          value={value || options[0]}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '13px',
            backgroundColor: theme.base2,
            color: theme.text1,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {dataType === 'number' && (
        <input
          type="number"
          value={value || 0}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: theme.base2,
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '13px',
            color: theme.text1,
            outline: 'none'
          }}
        />
      )}
      
      {dataType === 'booleanValue' && (
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={value || false}
            onChange={handleChange}
            style={{ marginRight: '8px' }}
          />
          <span style={{
            width: '40px',
            height: '20px',
            backgroundColor: value ? theme.accent1 : theme.shade2,
            borderRadius: '10px',
            position: 'relative',
            transition: 'background-color 200ms ease-out'
          }}>
            <span style={{
              position: 'absolute',
              top: '2px',
              left: value ? '22px' : '2px',
              width: '16px',
              height: '16px',
              backgroundColor: theme.base1,
              borderRadius: '50%',
              transition: 'left 200ms ease-out'
            }} />
          </span>
        </label>
      )}
    </div>
  );
}

// Main App wrapper with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;