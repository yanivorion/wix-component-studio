const MANIFEST = {
  "type": "ScrollAnimations.LayeredParallaxScene",
  "description": "Multi-layer parallax scene with depth-based movement speeds",
  "editorElement": {
    "selector": ".parallax-scene",
    "displayName": "Layered Parallax Scene",
    "archetype": "container",
    "data": {
      "layer1Image": {
        "dataType": "text",
        "displayName": "Background Layer URL",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
        "group": "Content"
      },
      "layer2Image": {
        "dataType": "text",
        "displayName": "Midground Layer URL",
        "defaultValue": "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1600",
        "group": "Content"
      },
      "layer3Image": {
        "dataType": "text",
        "displayName": "Foreground Layer URL",
        "defaultValue": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600",
        "group": "Content"
      },
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Discover Depth",
        "group": "Content"
      },
      "subheading": {
        "dataType": "text",
        "displayName": "Subheading Text",
        "defaultValue": "Scroll to explore the layers",
        "group": "Content"
      },
      "parallaxSpeed": {
        "dataType": "select",
        "displayName": "Parallax Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation"
      },
      "layer1Blur": {
        "dataType": "select",
        "displayName": "Background Blur (px)",
        "defaultValue": "4",
        "options": ["0", "2", "4", "6", "8"],
        "group": "Animation"
      },
      "layer2Blur": {
        "dataType": "select",
        "displayName": "Midground Blur (px)",
        "defaultValue": "2",
        "options": ["0", "1", "2", "3", "4"],
        "group": "Animation"
      },
      "overlayOpacity": {
        "dataType": "select",
        "displayName": "Text Overlay Opacity",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.4", "0.5"],
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "headingFontSize": {
        "dataType": "number",
        "displayName": "Heading Font Size (px)",
        "defaultValue": 64,
        "group": "Typography"
      },
      "subheadingFontSize": {
        "dataType": "number",
        "displayName": "Subheading Font Size (px)",
        "defaultValue": 20,
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
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const containerRef = React.useRef(null);

  const layer1Image = config?.layer1Image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600';
  const layer2Image = config?.layer2Image || 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1600';
  const layer3Image = config?.layer3Image || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600';
  const heading = config?.heading || 'Discover Depth';
  const subheading = config?.subheading || 'Scroll to explore the layers';
  const parallaxSpeed = config?.parallaxSpeed || 'medium';
  const layer1Blur = parseInt(config?.layer1Blur || '4');
  const layer2Blur = parseInt(config?.layer2Blur || '2');
  const overlayOpacity = parseFloat(config?.overlayOpacity || '0.3');
  const textColor = config?.textColor || '#FFFFFF';
  const overlayColor = config?.overlayColor || '#000000';
  const headingFontSize = parseInt(config?.headingFontSize || '64');
  const subheadingFontSize = parseInt(config?.subheadingFontSize || '20');
  const fontWeight = config?.fontWeight || '300';

  const speedMultiplier = {
    subtle: 0.5,
    medium: 1.0,
    dramatic: 1.5
  }[parallaxSpeed];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;
            
            // Calculate scroll progress (0 to 1)
            const progress = Math.max(0, Math.min(1, 
              (windowHeight - elementTop) / (windowHeight + elementHeight)
            ));
            
            setScrollProgress(progress);
          }
        });
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) }
    );

    observer.observe(container);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      const progress = Math.max(0, Math.min(1,
        (windowHeight - elementTop) / (windowHeight + elementHeight)
      ));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  const layer1Offset = prefersReducedMotion ? 0 : scrollProgress * -50 * speedMultiplier;
  const layer2Offset = prefersReducedMotion ? 0 : scrollProgress * -30 * speedMultiplier;
  const layer3Offset = prefersReducedMotion ? 0 : scrollProgress * -15 * speedMultiplier;

  return (
    <div
      ref={containerRef}
      className="parallax-scene"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000'
      }}
    >
      {/* Background Layer (slowest) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          transform: prefersReducedMotion ? 'none' : `translateY(${layer1Offset}%)`,
          transition: 'transform 100ms linear',
          willChange: 'transform',
          filter: `blur(${layer1Blur}px)`,
          zIndex: 1
        }}
      >
        <img
          src={layer1Image}
          alt="Background layer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Midground Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          transform: prefersReducedMotion ? 'none' : `translateY(${layer2Offset}%)`,
          transition: 'transform 100ms linear',
          willChange: 'transform',
          filter: `blur(${layer2Blur}px)`,
          opacity: 0.8,
          zIndex: 2
        }}
      >
        <img
          src={layer2Image}
          alt="Midground layer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Foreground Layer (fastest) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          transform: prefersReducedMotion ? 'none' : `translateY(${layer3Offset}%)`,
          transition: 'transform 100ms linear',
          willChange: 'transform',
          opacity: 0.6,
          zIndex: 3
        }}
      >
        <img
          src={layer3Image}
          alt="Foreground layer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          zIndex: 4
        }}
      />

      {/* Text Content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 5,
          width: '90%',
          maxWidth: '800px'
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
            marginBottom: '16px'
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
            lineHeight: 1.5
          }}
        >
          {subheading}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: scrollProgress < 0.2 ? 1 : 0,
          transition: 'opacity 300ms ease'
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: '12px',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          Scroll
        </div>
        <div
          style={{
            width: '1px',
            height: '32px',
            backgroundColor: textColor,
            opacity: 0.5
          }}
        />
      </div>
    </div>
  );
}


