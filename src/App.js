import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { ThemeProvider, useTheme } from './ThemeSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

function AppContent() {
  const { theme } = useTheme();
  
  const [tabs, setTabs] = useState([
    { id: 1, name: 'Component 1', code: '', manifest: null, config: {} }
  ]);
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

  const activeTab = tabs.find(t => t.id === activeTabId);

  const defaultCode = `const MANIFEST = {
  "type": "Fashion.LuxuryShowcase",
  "description": "A demonstration component",
  "editorElement": {
    "selector": ".demo-component",
    "displayName": "Demo Component",
    "archetype": "container",
    "data": {
      "title": {
        "dataType": "text",
        "displayName": "Title",
        "defaultValue": "Hello World",
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#FAFAFA",
        "group": "Style"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config }) {
  return (
    <div className="demo-component" style={{
      width: '100%',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: config.backgroundColor || '#FAFAFA',
      fontSize: '14px',
      color: '#71717A',
      fontWeight: '400',
      padding: '40px'
    }}>
      {config.title || 'Paste your component code and click "Load Component"'}
    </div>
  );
}`;

  const [editorCode, setEditorCode] = useState(defaultCode);

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
  };

  const handleAddTab = () => {
    const newTab = {
      id: nextTabId,
      name: `Component ${nextTabId}`,
      code: '',
      manifest: null,
      config: {}
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(nextTabId);
    setNextTabId(nextTabId + 1);
    setEditorCode(defaultCode);
  };

  const handleCloseTab = (tabId) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const handleTabSwitch = (tabId) => {
    setActiveTabId(tabId);
    const tab = tabs.find(t => t.id === tabId);
    setEditorCode(tab.code || defaultCode);
  };

  const handleRenderComponent = () => {
    try {
      setError(null);
      
      const manifestMatch = editorCode.match(/const\s+MANIFEST\s*=\s*({[\s\S]*?});/);
      if (!manifestMatch) {
        throw new Error('No MANIFEST found. Ensure: const MANIFEST = {...};');
      }
      
      const manifestObj = eval('(' + manifestMatch[1] + ')');
      
      const defaults = {};
      if (manifestObj.editorElement && manifestObj.editorElement.data) {
        Object.keys(manifestObj.editorElement.data).forEach(key => {
          defaults[key] = manifestObj.editorElement.data[key].defaultValue;
        });
      }
      
      const componentMatch = editorCode.match(/function Component\s*\(\s*{[\s\S]*?}\s*\)\s*{[\s\S]*?^}/m);
      if (!componentMatch) {
        throw new Error('No Component function found. Ensure: function Component({config}) {...}');
      }
      
      // Add metadata comment with project name, timestamp, component type, user request, and design brief
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
      
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { 
              ...tab, 
              code: codeWithComment, 
              manifest: manifestObj, 
              config: defaults,
              projectName: projectName,
              prompt: userPrompt,
              designBrief: designBrief,
              timestamp: timestamp
            }
          : tab
      ));
      
      // Clear prompt and design brief for next component (but keep project name)
      setUserPrompt('');
      setDesignBrief('');
      setShowEditor(false);
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleConfigChange = (key, value) => {
    setTabs(tabs.map(tab =>
      tab.id === activeTabId
        ? { ...tab, config: { ...tab.config, [key]: value } }
        : tab
    ));
  };

  return (
    <div className="app" style={{ backgroundColor: theme.base1 }}>
      {showEditor && (
        <>
          <div 
            className="editor-overlay" 
            onClick={() => setShowEditor(false)}
            style={{ backgroundColor: theme.isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }}
          />
          <div 
            className="editor-panel"
            style={{
              backgroundColor: theme.base1,
              border: `1px solid ${theme.border}`
            }}
          >
            <div className="editor-header" style={{ borderBottomColor: theme.border }}>
              <div>
                <h2 className="editor-title" style={{ color: theme.text1 }}>Component Editor</h2>
                <p className="editor-subtitle" style={{ color: theme.text3 }}>Paste manifest and component code</p>
              </div>
              <button 
                className="editor-close" 
                onClick={() => setShowEditor(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4L4 12M4 4l8 8"/>
                </svg>
              </button>
            </div>
            
            {error && (
              <div 
                className="editor-error"
                style={{
                  backgroundColor: theme.isDark ? theme.shade2 : '#FEE',
                  color: theme.isDark ? '#FCC' : '#C33',
                  borderColor: theme.isDark ? theme.shade3 : '#FCC'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 4.5a.5.5 0 011 0v3a.5.5 0 01-1 0v-3zM8 11a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Metadata Inputs */}
            <div style={{ 
              padding: '16px 24px 12px',
              borderBottom: `1px solid ${theme.border}`,
              backgroundColor: theme.base2
            }}>
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '500',
                color: theme.text2,
                marginBottom: '8px',
                letterSpacing: '0.01em'
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
                  transition: 'border-color 150ms ease-out',
                  marginBottom: '16px'
                }}
                onFocus={(e) => e.target.style.borderColor = theme.accent1}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />
              
              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '500',
                color: theme.text2,
                marginBottom: '8px',
                letterSpacing: '0.01em'
              }}>
                User Request / Prompt (optional)
              </label>
              <input
                type="text"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="e.g., Create a luxury product card with image hover effect and elegant transitions"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  backgroundColor: theme.base1,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: theme.text1,
                  outline: 'none',
                  transition: 'border-color 150ms ease-out',
                  marginBottom: '16px'
                }}
                onFocus={(e) => e.target.style.borderColor = theme.accent1}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />

              <label style={{ 
                display: 'block', 
                fontSize: '12px', 
                fontWeight: '500',
                color: theme.text2,
                marginBottom: '8px',
                letterSpacing: '0.01em'
              }}>
                Design Brief (optional)
              </label>
              <textarea
                value={designBrief}
                onChange={(e) => setDesignBrief(e.target.value)}
                placeholder="Paste design brief here (functional complexity, expressive complexity, visual profile, design style, color palette, typography, etc.)"
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
                  transition: 'border-color 150ms ease-out',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                onFocus={(e) => e.target.style.borderColor = theme.accent1}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />
              
              <p style={{
                fontSize: '11px',
                color: theme.text3,
                marginTop: '6px',
                fontStyle: 'italic'
              }}>
                All metadata will be saved as a comment at the top of your component code
              </p>
            </div>
            
            <textarea
              className="code-editor"
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
              spellCheck={false}
              placeholder="Paste component code here..."
              style={{
                backgroundColor: theme.base2,
                color: theme.text1,
                borderColor: theme.border
              }}
            />
            
            <div className="editor-actions">
              <button 
                className="btn-secondary" 
                onClick={handleSaveCode}
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.border}`,
                  color: theme.text1
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Save Code
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setEditorCode(defaultCode);
                  setUserPrompt('');
                  setDesignBrief('');
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${theme.border}`,
                  color: theme.text1
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Reset
              </button>
              <button 
                className="btn-primary" 
                onClick={handleRenderComponent}
                style={{
                  backgroundColor: theme.accent1,
                  border: 'none',
                  color: theme.isDark ? theme.text1 : theme.base1
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.accent2}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.accent1}
              >
                Load Component
              </button>
            </div>
          </div>
        </>
      )}

      <div className="canvas-area">
        <div 
          className="canvas-toolbar"
          style={{
            backgroundColor: theme.base2,
            borderBottomColor: theme.border
          }}
        >
          <div className="toolbar-left">
            <button 
              className="toolbar-btn" 
              onClick={() => setShowEditor(true)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: theme.text2
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 4h12M2 8h12M2 12h12"/>
              </svg>
              <span>Editor</span>
            </button>
            <button 
              className="toolbar-btn" 
              onClick={handleAddTab}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: theme.text2
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 3v10M3 8h10"/>
              </svg>
              <span>New Tab</span>
            </button>
          </div>
          
          <div className="toolbar-center">
            <div className="device-switcher">
              <button 
                className={`device-btn ${viewportMode === 'mobile' ? 'active' : ''}`}
                onClick={() => handleDeviceSwitch('mobile')}
                title="Mobile (390px)"
                style={{
                  backgroundColor: viewportMode === 'mobile' ? theme.shade1 : 'transparent',
                  borderColor: theme.border,
                  color: theme.text2
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="2" width="8" height="12" rx="1.5"/>
                  <path d="M7 12.5h2"/>
                </svg>
              </button>
              
              <button 
                className={`device-btn ${viewportMode === 'tablet' ? 'active' : ''}`}
                onClick={() => handleDeviceSwitch('tablet')}
                title="Tablet (768px)"
                style={{
                  backgroundColor: viewportMode === 'tablet' ? theme.shade1 : 'transparent',
                  borderColor: theme.border,
                  color: theme.text2
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="10" rx="1.5"/>
                  <path d="M7 11h2"/>
                </svg>
              </button>
              
              <button 
                className={`device-btn ${viewportMode === 'desktop' ? 'active' : ''}`}
                onClick={() => handleDeviceSwitch('desktop')}
                title="Desktop (1280px)"
                style={{
                  backgroundColor: viewportMode === 'desktop' ? theme.shade1 : 'transparent',
                  borderColor: theme.border,
                  color: theme.text2
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="8" rx="1"/>
                  <path d="M6 14h4M8 11v3"/>
                </svg>
              </button>
              
              <div className="device-divider" style={{ backgroundColor: theme.border }}></div>
              
              <span className="canvas-size-indicator" style={{ color: theme.text2 }}>{canvasSize.width}px</span>
            </div>
          </div>
          
          <div className="toolbar-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                className="toolbar-btn" 
                onClick={handleZoomOut} 
                title="Zoom Out"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2
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
                className="toolbar-btn" 
                onClick={handleZoomIn} 
                title="Zoom In"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2
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
                className="toolbar-btn" 
                onClick={handleZoomReset} 
                title="Reset Zoom"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.shade1}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8a6 6 0 0112 0M14 8a6 6 0 01-12 0"/>
                </svg>
              </button>
            </div>
            
            <ThemeSwitcher />
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginLeft: '16px',
              paddingLeft: '16px',
              borderLeft: `1px solid ${theme.border}`
            }}>
              <span className="component-name" style={{ color: theme.text2 }}>
                {activeTab?.manifest?.type || 'No Component Loaded'}
              </span>
              
              <div style={{
                width: '1px',
                height: '24px',
                backgroundColor: theme.border
              }}></div>
              
              <button
                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                className="toolbar-btn"
                style={{
                  padding: '8px',
                  minWidth: 'auto',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: theme.text2
                }}
                title={isPanelCollapsed ? 'Show Properties' : 'Hide Properties'}
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

        <div style={{
          backgroundColor: theme.shade1,
          borderBottom: `1px solid ${theme.border}`
        }}>
          <div className="width-slider-container">
            <div className="width-slider-wrapper">
              <span className="slider-label" style={{ color: theme.text3 }}>390</span>
              <input
                type="range"
                className="width-slider"
                min="390"
                max="1920"
                step="10"
                value={canvasSize.width}
                onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                style={{
                  background: `linear-gradient(to right, ${theme.accent1} 0%, ${theme.accent1} ${((canvasSize.width - 390) / (1920 - 390)) * 100}%, ${theme.shade3} ${((canvasSize.width - 390) / (1920 - 390)) * 100}%, ${theme.shade3} 100%)`
                }}
              />
              <span className="slider-label" style={{ color: theme.text3 }}>1920</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '2px'
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
                  borderTop: activeTabId === tab.id ? `2px solid ${theme.accent1}` : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: activeTabId === tab.id ? theme.text1 : theme.text3,
                  whiteSpace: 'nowrap',
                  transition: 'all 150ms ease'
                }}
              >
                <span>{tab.name}</span>
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
          </div>
        </div>
        
        <div className="canvas-wrapper" style={{ 
          padding: '60px 40px 40px 40px',
          overflow: 'auto',
          backgroundColor: theme.base2
        }}>
          <div style={{
            width: `${canvasSize.width}px`,
            margin: '0 auto',
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 200ms ease-out'
          }}>
            <LiveComponent 
              code={activeTab?.code || ''} 
              config={activeTab?.config || {}} 
            />
          </div>
        </div>
      </div>

      <div 
        className="properties-panel" 
        style={{
          width: isPanelCollapsed ? '0px' : '320px',
          transition: 'width 300ms ease-out',
          backgroundColor: theme.base1,
          borderLeft: `1px solid ${theme.border}`
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
          <div className="properties-header" style={{ borderBottomColor: theme.border }}>
            <h3 className="properties-title" style={{ color: theme.text1 }}>Properties</h3>
            {activeTab?.manifest && (
              <span className="properties-count" style={{ 
                backgroundColor: theme.shade2,
                color: theme.text2
              }}>
                {activeTab.manifest.editorElement?.data ? Object.keys(activeTab.manifest.editorElement.data).length : 0}
              </span>
            )}
          </div>

          {activeTab?.manifest?.editorElement?.data ? (
            <div 
              className="properties-list"
              style={{
                overflowY: 'auto',
                flex: 1
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
            <div className="properties-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.text3} strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 9h6M9 15h6"/>
              </svg>
              <p style={{ color: theme.text3 }}>Load a component to view properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LiveComponent({ code, config }) {
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
      setComponent(() => DefaultPlaceholder);
      return;
    }

    try {
      const transformed = window.Babel.transform(code, {
        presets: ['react']
      }).code;

      const componentFunc = new Function('React', 'useState', 'useRef', 'useEffect', 'config', `
        ${transformed}
        return Component;
      `);

      const CreatedComponent = componentFunc(React, useState, useRef, useEffect, config);
      setComponent(() => CreatedComponent);
      setRenderError(null);
    } catch (err) {
      setRenderError(err.message);
      console.error('Component creation error:', err);
    }
  }, [code, config, isBabelLoaded]);

  if (renderError) {
    return (
      <div className="render-error">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
        <strong>Render Error</strong>
        <pre>{renderError}</pre>
      </div>
    );
  }

  if (!isBabelLoaded) {
    return (
      <div className="default-placeholder">
        <p>Loading JSX transpiler...</p>
      </div>
    );
  }

  if (!Component) {
    return <DefaultPlaceholder />;
  }

  return <Component config={config} />;
}

function DefaultPlaceholder() {
  return (
    <div className="default-placeholder">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 9h6M9 15h6M9 12h6"/>
      </svg>
      <p>Open editor and load a component</p>
    </div>
  );
}

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
    <div className="property-control">
      <label className="property-label" style={{ color: theme.text2 }}>{displayName}</label>
      
      {dataType === 'text' && !options && (
        <input
          type="text"
          className="property-input text"
          value={value || ''}
          onChange={handleChange}
          style={{
            backgroundColor: theme.base2,
            border: `1px solid ${theme.border}`,
            color: theme.text1
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
            className="property-input text"
            value={value || ''}
            onChange={handleChange}
            placeholder="#000000"
            style={{ 
              flex: 1,
              backgroundColor: theme.base2,
              border: `1px solid ${theme.border}`,
              color: theme.text1
            }}
          />
        </div>
      )}

      {dataType === 'select' && options && (
        <select
          className="property-input text"
          value={value || options[0]}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: theme.base2,
            color: theme.text1,
            cursor: 'pointer'
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
          className="property-input text"
          value={value || 0}
          onChange={handleChange}
          style={{
            backgroundColor: theme.base2,
            border: `1px solid ${theme.border}`,
            color: theme.text1
          }}
        />
      )}
      
      {dataType === 'booleanValue' && (
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            className="property-checkbox"
            checked={value || false}
            onChange={handleChange}
          />
          <span 
            className="checkbox-indicator"
            style={{
              backgroundColor: value ? theme.accent1 : theme.base2,
              borderColor: theme.border
            }}
          ></span>
        </label>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;