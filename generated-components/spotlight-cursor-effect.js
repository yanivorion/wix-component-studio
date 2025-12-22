const MANIFEST = {
  "type": "MouseTracking.SpotlightCursorEffect",
  "description": "Circular spotlight follows mouse revealing full-color content while rest remains grayscale",
  "editorElement": {
    "selector": ".spotlight-cursor",
    "displayName": "Spotlight Cursor Effect",
    "archetype": "container",
    "data": {
      "contentImage": {
        "dataType": "text",
        "displayName": "Background Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
        "group": "Content",
        "description": "Image to reveal with spotlight"
      },
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Explore with Light",
        "group": "Content"
      },
      "subheading": {
        "dataType": "text",
        "displayName": "Subheading Text",
        "defaultValue": "Move your cursor to reveal the hidden beauty",
        "group": "Content"
      },
      "showText": {
        "dataType": "booleanValue",
        "displayName": "Show Text Overlay",
        "defaultValue": true,
        "group": "Content"
      },
      "spotlightSize": {
        "dataType": "select",
        "displayName": "Spotlight Size (px)",
        "defaultValue": "200",
        "options": ["150", "200", "250", "300", "350"],
        "group": "Layout"
      },
      "blurEdge": {
        "dataType": "select",
        "displayName": "Edge Blur Amount (px)",
        "defaultValue": "50",
        "options": ["30", "40", "50", "60", "80"],
        "group": "Animation"
      },
      "followSpeed": {
        "dataType": "select",
        "displayName": "Follow Speed",
        "defaultValue": "medium",
        "options": ["instant", "fast", "medium", "slow"],
        "group": "Animation"
      },
      "grayscaleAmount": {
        "dataType": "select",
        "displayName": "Grayscale Amount (%)",
        "defaultValue": "100",
        "options": ["80", "90", "100"],
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "headingFontSize": {
        "dataType": "number",
        "displayName": "Heading Font Size (px)",
        "defaultValue": 56,
        "group": "Typography"
      },
      "subheadingFontSize": {
        "dataType": "number",
        "displayName": "Subheading Font Size (px)",
        "defaultValue": 18,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "300",
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
  const [mousePosition, setMousePosition] = React.useState({ x: -1000, y: -1000 });
  const containerRef = React.useRef(null);

  const contentImage = config?.contentImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600';
  const heading = config?.heading || 'Explore with Light';
  const subheading = config?.subheading || 'Move your cursor to reveal the hidden beauty';
  const showText = config?.showText !== false;
  const spotlightSize = parseInt(config?.spotlightSize || '200');
  const blurEdge = parseInt(config?.blurEdge || '50');
  const followSpeed = config?.followSpeed || 'medium';
  const grayscaleAmount = parseInt(config?.grayscaleAmount || '100');
  const backgroundColor = config?.backgroundColor || '#212529';
  const textColor = config?.textColor || '#FFFFFF';
  const headingFontSize = parseInt(config?.headingFontSize || '56');
  const subheadingFontSize = parseInt(config?.subheadingFontSize || '18');
  const fontWeight = config?.fontWeight || '300';

  const transitionDuration = {
    instant: '0ms',
    fast: '50ms',
    medium: '150ms',
    slow: '300ms'
  }[followSpeed];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const maskId = React.useMemo(() => {
    return typeof React.useId === 'function'
      ? `spotlight-mask-${React.useId().replace(/:/g, '')}`
      : `spotlight-mask-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="spotlight-cursor"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor,
        overflow: 'hidden',
        cursor: 'none'
      }}
    >
      {/* Grayscale Base Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${contentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `grayscale(${grayscaleAmount}%)`,
          zIndex: 1
        }}
      />

      {/* Color Layer with Spotlight Mask */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${contentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 2,
          clipPath: prefersReducedMotion
            ? 'none'
            : `circle(${spotlightSize}px at ${mousePosition.x}px ${mousePosition.y}px)`,
          filter: `blur(${blurEdge}px)`,
          transform: 'scale(1.1)',
          transition: prefersReducedMotion ? 'none' : `clip-path ${transitionDuration} ease-out`,
          willChange: 'clip-path'
        }}
      />

      {/* Sharp Center Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${contentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 3,
          clipPath: prefersReducedMotion
            ? 'none'
            : `circle(${spotlightSize - blurEdge}px at ${mousePosition.x}px ${mousePosition.y}px)`,
          transition: prefersReducedMotion ? 'none' : `clip-path ${transitionDuration} ease-out`,
          willChange: 'clip-path'
        }}
      />

      {/* Text Overlay */}
      {showText && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 10,
            width: '90%',
            maxWidth: '800px',
            pointerEvents: 'none'
          }}
        >
          <h1
            style={{
              margin: 0,
              padding: 0,
              fontSize: headingFontSize + 'px',
              fontWeight,
              color: textColor,
              letterSpacing: '0.025em',
              lineHeight: 1.2,
              marginBottom: '16px',
              textShadow: '0 2px 12px rgba(0,0,0,0.3)'
            }}
          >
            {heading}
          </h1>
          <p
            style={{
              margin: 0,
              padding: 0,
              fontSize: subheadingFontSize + 'px',
              fontWeight: '400',
              color: textColor,
              opacity: 0.9,
              letterSpacing: '0.025em',
              lineHeight: 1.5,
              textShadow: '0 1px 8px rgba(0,0,0,0.3)'
            }}
          >
            {subheading}
          </p>
        </div>
      )}

      {/* Custom Cursor */}
      <div
        style={{
          position: 'absolute',
          top: mousePosition.y,
          left: mousePosition.x,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: `2px solid ${textColor}`,
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          pointerEvents: 'none',
          opacity: mousePosition.x < 0 ? 0 : 0.6,
          transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease'
        }}
      />
    </div>
  );
}

