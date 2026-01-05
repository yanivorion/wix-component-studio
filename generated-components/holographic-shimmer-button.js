const MANIFEST = {
  "type": "MegaButtons.HolographicShimmerButton",
  "description": "Mega button with holographic rainbow shimmer that follows mouse movement",
  "editorElement": {
    "selector": ".holographic-button",
    "displayName": "Holographic Shimmer Button",
    "archetype": "container",
    "data": {
      "buttonText": {
        "dataType": "text",
        "displayName": "Button Text",
        "defaultValue": "Discover More",
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
        "defaultValue": 70,
        "group": "Layout"
      },
      "shimmerIntensity": {
        "dataType": "select",
        "displayName": "Shimmer Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation"
      },
      "magneticStrength": {
        "dataType": "select",
        "displayName": "Magnetic Pull Strength",
        "defaultValue": "medium",
        "options": ["none", "subtle", "medium", "strong"],
        "group": "Animation"
      },
      "baseColor": {
        "dataType": "color",
        "displayName": "Base Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "fontSize": {
        "dataType": "number",
        "displayName": "Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "500",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Border Radius (px)",
        "defaultValue": "8",
        "options": ["0", "4", "8", "12", "35"],
        "group": "Layout"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "vertical"
    }
  }
};

function Component({ config = {} }) {
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [buttonPos, setButtonPos] = React.useState({ x: 0, y: 0 });
  const buttonRef = React.useRef(null);

  const buttonText = config?.buttonText || 'Discover More';
  const width = parseInt(config?.width || '280');
  const height = parseInt(config?.height || '70');
  const shimmerIntensity = config?.shimmerIntensity || 'medium';
  const magneticStrength = config?.magneticStrength || 'medium';
  const baseColor = config?.baseColor || '#495057';
  const textColor = config?.textColor || '#FFFFFF';
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const fontSize = parseInt(config?.fontSize || '18');
  const fontWeight = config?.fontWeight || '500';
  const borderRadius = parseInt(config?.borderRadius || '8');

  const shimmerMultiplier = {
    subtle: 0.3,
    medium: 0.5,
    dramatic: 0.8
  }[shimmerIntensity];

  const magneticMultiplier = {
    none: 0,
    subtle: 0.15,
    medium: 0.25,
    strong: 0.4
  }[magneticStrength];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const gradientId = React.useMemo(() => {
    return typeof React.useId === 'function'
      ? `holographic-${React.useId().replace(/:/g, '')}`
      : `holographic-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const handleMouseMove = (e) => {
    if (!buttonRef.current || prefersReducedMotion) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Magnetic effect
    if (magneticMultiplier > 0) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * magneticMultiplier;
      const deltaY = (e.clientY - centerY) * magneticMultiplier;
      setButtonPos({ x: deltaX, y: deltaY });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 50, y: 50 });
    setButtonPos({ x: 0, y: 0 });
  };

  return (
    <div
      className="holographic-button"
      style={{
        backgroundColor,
        padding: '80px 40px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: width + 'px',
          height: height + 'px',
          backgroundColor: baseColor,
          color: textColor,
          fontSize: fontSize + 'px',
          fontWeight,
          border: 'none',
          borderRadius: borderRadius + 'px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transform: prefersReducedMotion
            ? 'none'
            : `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
          transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out',
          letterSpacing: '0.05em',
          willChange: 'transform'
        }}
      >
        {/* Holographic shimmer layer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: prefersReducedMotion
              ? 'none'
              : `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
                  rgba(255,255,255,${shimmerMultiplier * 0.8}) 0%, 
                  transparent 60%)`,
            opacity: prefersReducedMotion ? 0 : 1,
            transition: 'background 150ms ease-out',
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Rainbow gradient layer */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: prefersReducedMotion ? 0 : shimmerMultiplier
          }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientTransform={prefersReducedMotion ? 'none' : `translate(${(mousePos.x - 50) / 100}, ${(mousePos.y - 50) / 100})`}
            >
              <stop offset="0%" stopColor="#FF0080" stopOpacity={shimmerMultiplier} />
              <stop offset="25%" stopColor="#7928CA" stopOpacity={shimmerMultiplier} />
              <stop offset="50%" stopColor="#0070F3" stopOpacity={shimmerMultiplier} />
              <stop offset="75%" stopColor="#00DFD8" stopOpacity={shimmerMultiplier} />
              <stop offset="100%" stopColor="#FF0080" stopOpacity={shimmerMultiplier} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </svg>

        {/* Text */}
        <span style={{ position: 'relative', zIndex: 1 }}>
          {buttonText}
        </span>

        {/* Border glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: borderRadius + 'px',
            padding: '1px',
            background: prefersReducedMotion
              ? 'transparent'
              : `linear-gradient(
                  ${(mousePos.x / 100) * 360}deg,
                  rgba(255,255,255,${shimmerMultiplier * 0.5}),
                  transparent
                )`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            transition: 'background 150ms ease-out',
            pointerEvents: 'none'
          }}
        />
      </button>
    </div>
  );
}


