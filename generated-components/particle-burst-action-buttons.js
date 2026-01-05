const MANIFEST = {
  "type": "MegaButtons.ParticleBurstActionButtons",
  "description": "Action buttons that emit particle bursts on hover with physics",
  "editorElement": {
    "selector": ".particle-burst-buttons",
    "displayName": "Particle Burst Action Buttons",
    "archetype": "container",
    "data": {
      "button1Label": {
        "dataType": "text",
        "displayName": "Button 1 Label",
        "defaultValue": "Save",
        "group": "Content"
      },
      "button1Color": {
        "dataType": "color",
        "displayName": "Button 1 Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "button2Label": {
        "dataType": "text",
        "displayName": "Button 2 Label",
        "defaultValue": "Share",
        "group": "Content"
      },
      "button2Color": {
        "dataType": "color",
        "displayName": "Button 2 Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "button3Label": {
        "dataType": "text",
        "displayName": "Button 3 Label",
        "defaultValue": "Delete",
        "group": "Content"
      },
      "button3Color": {
        "dataType": "color",
        "displayName": "Button 3 Color",
        "defaultValue": "#ADB5BD",
        "group": "Colors"
      },
      "particleCount": {
        "dataType": "select",
        "displayName": "Particle Count",
        "defaultValue": "15",
        "options": ["10", "15", "20", "25", "30"],
        "group": "Animation"
      },
      "particleSpeed": {
        "dataType": "select",
        "displayName": "Particle Speed",
        "defaultValue": "medium",
        "options": ["slow", "medium", "fast"],
        "group": "Animation"
      },
      "gravityStrength": {
        "dataType": "select",
        "displayName": "Gravity Strength",
        "defaultValue": "0.2",
        "options": ["0.1", "0.2", "0.3", "0.4"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
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
  const [particles, setParticles] = React.useState([]);
  const [hoveredButton, setHoveredButton] = React.useState(null);
  const animationFrameRef = React.useRef(null);
  const particleIdCounter = React.useRef(0);

  const buttons = [
    { label: config?.button1Label || 'Save', color: config?.button1Color || '#495057' },
    { label: config?.button2Label || 'Share', color: config?.button2Color || '#6C757D' },
    { label: config?.button3Label || 'Delete', color: config?.button3Color || '#ADB5BD' }
  ];

  const particleCount = parseInt(config?.particleCount || '15');
  const particleSpeed = config?.particleSpeed || 'medium';
  const gravityStrength = parseFloat(config?.gravityStrength || '0.2');
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const textColor = config?.textColor || '#FFFFFF';
  const fontSize = parseInt(config?.fontSize || '16');
  const fontWeight = config?.fontWeight || '400';

  const speedMultiplier = {
    slow: 0.7,
    medium: 1.0,
    fast: 1.4
  }[particleSpeed];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const createParticles = (x, y, color) => {
    if (prefersReducedMotion) return;

    const newParticles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = (2 + Math.random() * 3) * speedMultiplier;
      return {
        id: particleIdCounter.current++,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 4 + Math.random() * 4,
        color,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.01
      };
    });

    setParticles(prev => [...prev, ...newParticles]);
  };

  const updateParticles = () => {
    setParticles(prev => {
      const updated = prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + gravityStrength,
        life: p.life - p.decay
      })).filter(p => p.life > 0);

      if (updated.length > 0) {
        animationFrameRef.current = requestAnimationFrame(updateParticles);
      }

      return updated;
    });
  };

  React.useEffect(() => {
    if (particles.length > 0 && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [particles.length]);

  const handleMouseEnter = (index, event) => {
    setHoveredButton(index);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createParticles(rect.left + x, rect.top + y, buttons[index].color);
  };

  const handleMouseMove = (index, event) => {
    if (hoveredButton === index && Math.random() > 0.7) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      createParticles(rect.left + x, rect.top + y, buttons[index].color);
    }
  };

  return (
    <div
      className="particle-burst-buttons"
      style={{
        backgroundColor,
        padding: '80px 40px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {buttons.map((button, index) => (
          <button
            key={index}
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              minWidth: '160px',
              padding: '16px 32px',
              backgroundColor: button.color,
              color: textColor,
              fontSize: fontSize + 'px',
              fontWeight,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: prefersReducedMotion ? 'none' : 'transform 200ms ease, box-shadow 200ms ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              letterSpacing: '0.025em',
              position: 'relative',
              zIndex: 1
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = hoveredButton === index ? 'scale(1.05)' : 'scale(1)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
              handleMouseEnter(index, e);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              setHoveredButton(null);
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Particles */}
      {!prefersReducedMotion && particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'fixed',
            left: particle.x + 'px',
            top: particle.y + 'px',
            width: particle.size + 'px',
            height: particle.size + 'px',
            borderRadius: '50%',
            backgroundColor: particle.color,
            opacity: particle.life,
            pointerEvents: 'none',
            zIndex: 2,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
}


