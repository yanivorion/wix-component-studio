const MANIFEST = {
  "type": "MegaButtons.LiquidMorphButton",
  "description": "Large CTA button with liquid morph background and particle explosion effect",
  "editorElement": {
    "selector": ".liquid-button-container",
    "displayName": "Liquid Morph Button",
    "archetype": "container",
    "data": {
      "buttonText": {
        "dataType": "text",
        "displayName": "Button Text",
        "defaultValue": "Click Me",
        "group": "Content"
      },
      "width": {
        "dataType": "number",
        "displayName": "Button Width (px)",
        "defaultValue": 280,
        "group": "Layout"
      },
      "height": {
        "dataType": "number",
        "displayName": "Button Height (px)",
        "defaultValue": 80,
        "group": "Layout"
      },
      "color": {
        "dataType": "color",
        "displayName": "Button Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "hoverColor": {
        "dataType": "color",
        "displayName": "Hover Color",
        "defaultValue": "#343A40",
        "group": "Colors"
      },
      "successColor": {
        "dataType": "color",
        "displayName": "Success Checkmark Color",
        "defaultValue": "#212529",
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
        "defaultValue": 24,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "cornerRadius": {
        "dataType": "number",
        "displayName": "Corner Radius (px)",
        "defaultValue": 12,
        "group": "Layout"
      },
      "particleCount": {
        "dataType": "select",
        "displayName": "Particle Count",
        "defaultValue": "12",
        "options": ["8", "10", "12", "15", "20"],
        "group": "Animation"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [particles, setParticles] = React.useState([]);
  const particlesRef = React.useRef([]);
  const buttonRef = React.useRef(null);
  const checkRef = React.useRef(null);

  const width = parseInt(config?.width || '280');
  const height = parseInt(config?.height || '80');
  const color = config?.color || '#495057';
  const hoverColor = config?.hoverColor || '#343A40';
  const successColor = config?.successColor || '#212529';
  const textColor = config?.textColor || '#FFFFFF';
  const fontSize = parseInt(config?.fontSize || '24');
  const text = config?.buttonText || 'Click Me';
  const radius = parseInt(config?.cornerRadius || '12');
  const fontWeight = config?.fontWeight || '500';
  const particleCount = parseInt(config?.particleCount || '12');

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const filterId = React.useMemo(() => {
    return typeof React.useId === 'function'
      ? `turb-${React.useId().replace(/:/g, '')}`
      : `turb-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Click/tap particle explosion effect
  const scatter = () => {
    if (isAnimating || prefersReducedMotion) return;
    
    setIsAnimating(true);
    setIsSuccess(false);

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      targetX: (Math.random() - 0.5) * width * 0.7,
      targetY: (Math.random() - 0.5) * height
    }));
    
    setParticles(newParticles);

    // Animate particles via refs
    setTimeout(() => {
      particlesRef.current.forEach((particle, i) => {
        if (!particle || !newParticles[i]) return;
        
        particle.style.transform = `translate(${newParticles[i].targetX}px, ${newParticles[i].targetY}px)`;
        particle.style.opacity = '0';
      });
    }, 10);

    setTimeout(() => {
      setParticles([]);
      setIsAnimating(false);
      setIsSuccess(true);

      if (checkRef.current) {
        checkRef.current.style.transform = 'scale(1)';
      }
    }, 400);
  };

  // Reset to initial state
  const reset = () => {
    if (!isAnimating) {
      setIsSuccess(false);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        backgroundColor: '#F8F9FA'
      }}
    >
      <button
        ref={buttonRef}
        className="liquid-button-container"
        style={{
          width: width + 'px',
          height: height + 'px',
          borderRadius: radius + 'px',
          backgroundColor: isSuccess ? successColor : (isHovered && !isAnimating ? hoverColor : color),
          color: textColor,
          fontSize: fontSize + 'px',
          fontWeight,
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: prefersReducedMotion ? 'none' : 'background-color 300ms ease, transform 300ms ease',
          transform: isHovered && !isAnimating ? 'scale(1.05)' : 'scale(1)',
          willChange: 'transform, background-color'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          reset();
        }}
        onClick={scatter}
      >
        <span
          style={{
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 200ms ease'
          }}
        >
          {text}
        </span>

        {isSuccess && (
          <svg
            ref={checkRef}
            width="36"
            height="36"
            viewBox="0 0 24 24"
            style={{
              position: 'absolute',
              transform: 'scale(0)',
              transition: prefersReducedMotion ? 'none' : 'transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <path fill={textColor} d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}

        {particles.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              pointerEvents: 'none'
            }}
          >
            {particles.map((p, i) => (
              <div
                key={p.id}
                ref={el => particlesRef.current[i] = el}
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  borderRadius: '12px',
                  backgroundColor: textColor,
                  opacity: 0.7,
                  transform: 'translate(0, 0)',
                  transition: prefersReducedMotion ? 'none' : 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease',
                  willChange: 'transform, opacity',
                  marginLeft: '-6px',
                  marginTop: '-6px'
                }}
              />
            ))}
          </div>
        )}

        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id={filterId}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01"
                numOctaves="2"
                result="turbulence"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="20"
                xChannelSelector="R"
                yChannelSelector="B"
              />
            </filter>
          </defs>
        </svg>
      </button>
    </div>
  );
}

