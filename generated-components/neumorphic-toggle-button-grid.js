const MANIFEST = {
  "type": "MegaButtons.NeumorphicToggleButtonGrid",
  "description": "Grid of neumorphic toggle buttons with soft shadow inversion effects",
  "editorElement": {
    "selector": ".neumorphic-toggle-grid",
    "displayName": "Neumorphic Toggle Button Grid",
    "archetype": "container",
    "data": {
      "button1Label": {
        "dataType": "text",
        "displayName": "Button 1 Label",
        "defaultValue": "Design",
        "group": "Content"
      },
      "button2Label": {
        "dataType": "text",
        "displayName": "Button 2 Label",
        "defaultValue": "Development",
        "group": "Content"
      },
      "button3Label": {
        "dataType": "text",
        "displayName": "Button 3 Label",
        "defaultValue": "Marketing",
        "group": "Content"
      },
      "button4Label": {
        "dataType": "text",
        "displayName": "Button 4 Label",
        "defaultValue": "Analytics",
        "group": "Content"
      },
      "button5Label": {
        "dataType": "text",
        "displayName": "Button 5 Label",
        "defaultValue": "Support",
        "group": "Content"
      },
      "button6Label": {
        "dataType": "text",
        "displayName": "Button 6 Label",
        "defaultValue": "Strategy",
        "group": "Content"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "buttonSize": {
        "dataType": "select",
        "displayName": "Button Size",
        "defaultValue": "medium",
        "options": ["small", "medium", "large"],
        "group": "Layout"
      },
      "gap": {
        "dataType": "select",
        "displayName": "Grid Gap (px)",
        "defaultValue": "24",
        "options": ["16", "20", "24", "32"],
        "group": "Layout"
      },
      "multiSelect": {
        "dataType": "booleanValue",
        "displayName": "Allow Multiple Selection",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "buttonBackground": {
        "dataType": "color",
        "displayName": "Button Background",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "activeTextColor": {
        "dataType": "color",
        "displayName": "Active Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "glowColor": {
        "dataType": "color",
        "displayName": "Active Glow Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 16,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "400",
        "options": ["300", "400", "500"],
        "group": "Typography"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [activeButtons, setActiveButtons] = React.useState(new Set());

  const buttons = [
    config?.button1Label || 'Design',
    config?.button2Label || 'Development',
    config?.button3Label || 'Marketing',
    config?.button4Label || 'Analytics',
    config?.button5Label || 'Support',
    config?.button6Label || 'Strategy'
  ];

  const gridColumns = parseInt(config?.gridColumns || '3');
  const buttonSize = config?.buttonSize || 'medium';
  const gap = parseInt(config?.gap || '24');
  const multiSelect = config?.multiSelect !== false;
  const backgroundColor = config?.backgroundColor || '#E9ECEF';
  const buttonBackground = config?.buttonBackground || '#E9ECEF';
  const textColor = config?.textColor || '#495057';
  const activeTextColor = config?.activeTextColor || '#212529';
  const glowColor = config?.glowColor || '#495057';
  const fontSize = parseInt(config?.fontSize || '16');
  const fontWeight = config?.fontWeight || '400';

  const buttonSizes = {
    small: { width: 140, height: 100 },
    medium: { width: 180, height: 120 },
    large: { width: 220, height: 140 }
  };

  const size = buttonSizes[buttonSize];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleToggle = (index) => {
    setActiveButtons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!multiSelect) {
          newSet.clear();
        }
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getButtonStyles = (index) => {
    const isActive = activeButtons.has(index);
    
    return {
      width: size.width + 'px',
      height: size.height + 'px',
      background: buttonBackground,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      borderRadius: '16px',
      fontSize: fontSize + 'px',
      fontWeight,
      color: isActive ? activeTextColor : textColor,
      transition: prefersReducedMotion
        ? 'none'
        : 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
      boxShadow: isActive
        ? `inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.7), 0 0 0 2px ${glowColor}20`
        : '6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)',
      transform: isActive ? 'scale(0.98)' : 'scale(1)',
      willChange: 'transform, box-shadow'
    };
  };

  return (
    <div
      className="neumorphic-toggle-grid"
      style={{
        backgroundColor,
        padding: '60px 40px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: gap + 'px',
          maxWidth: '1200px',
          width: '100%'
        }}
      >
        {buttons.map((label, index) => (
          <button
            key={index}
            onClick={() => handleToggle(index)}
            aria-pressed={activeButtons.has(index)}
            aria-label={label}
            style={getButtonStyles(index)}
            onMouseEnter={(e) => {
              if (!activeButtons.has(index)) {
                e.currentTarget.style.boxShadow = '8px 8px 16px rgba(0,0,0,0.2), -8px -8px 16px rgba(255,255,255,0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (!activeButtons.has(index)) {
                e.currentTarget.style.boxShadow = '6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)';
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: activeButtons.has(index) ? glowColor : 'transparent',
                  border: `2px solid ${activeButtons.has(index) ? glowColor : textColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: prefersReducedMotion ? 'none' : 'all 300ms ease',
                  boxShadow: activeButtons.has(index)
                    ? `0 0 12px ${glowColor}40`
                    : 'none'
                }}
              >
                {activeButtons.has(index) && (
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#FFFFFF"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                    />
                  </svg>
                )}
              </div>
              <span
                style={{
                  letterSpacing: '0.025em',
                  textTransform: 'uppercase',
                  fontSize: fontSize * 0.75 + 'px'
                }}
              >
                {label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


