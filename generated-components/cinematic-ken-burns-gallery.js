const MANIFEST = {
  "type": "ComplexSlideshows.CinematicKenBurnsGallery",
  "description": "Full-screen cinematic slideshow with Ken Burns zoom and pan effects",
  "editorElement": {
    "selector": ".ken-burns-gallery",
    "displayName": "Cinematic Ken Burns Gallery",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1600,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600",
        "group": "Content",
        "description": "Comma-separated image URLs"
      },
      "titles": {
        "dataType": "text",
        "displayName": "Slide Titles",
        "defaultValue": "Luxury Collection,Timeless Elegance,Modern Sophistication",
        "group": "Content",
        "description": "Comma-separated titles (one per image)"
      },
      "subtitles": {
        "dataType": "text",
        "displayName": "Slide Subtitles",
        "defaultValue": "Discover Excellence,Refined Design,Premium Quality",
        "group": "Content",
        "description": "Comma-separated subtitles (one per image)"
      },
      "autoPlay": {
        "dataType": "booleanValue",
        "displayName": "Auto Play",
        "defaultValue": true,
        "group": "Content"
      },
      "slideDuration": {
        "dataType": "select",
        "displayName": "Slide Duration (seconds)",
        "defaultValue": "8",
        "options": ["5", "6", "7", "8", "10", "12"],
        "group": "Animation"
      },
      "kenBurnsIntensity": {
        "dataType": "select",
        "displayName": "Ken Burns Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation"
      },
      "transitionDuration": {
        "dataType": "select",
        "displayName": "Transition Duration (ms)",
        "defaultValue": "1200",
        "options": ["800", "1000", "1200", "1500", "2000"],
        "group": "Animation"
      },
      "showTextOverlay": {
        "dataType": "booleanValue",
        "displayName": "Show Text Overlay",
        "defaultValue": true,
        "group": "Content"
      },
      "textPosition": {
        "dataType": "select",
        "displayName": "Text Position",
        "defaultValue": "center",
        "options": ["center", "bottom-left", "bottom-center", "top-left"],
        "group": "Layout"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Overlay Color",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "overlayOpacity": {
        "dataType": "select",
        "displayName": "Overlay Opacity",
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
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 72,
        "group": "Typography"
      },
      "subtitleFontSize": {
        "dataType": "number",
        "displayName": "Subtitle Font Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Font Weight",
        "defaultValue": "300",
        "options": ["300", "400", "500"],
        "group": "Typography"
      },
      "letterSpacing": {
        "dataType": "select",
        "displayName": "Letter Spacing",
        "defaultValue": "0.05em",
        "options": ["0em", "0.025em", "0.05em", "0.075em", "0.1em"],
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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [animatedChars, setAnimatedChars] = React.useState(new Set());
  const autoPlayTimerRef = React.useRef(null);

  const images = React.useMemo(() => {
    return (config?.images || '').split(',').map(url => url.trim()).filter(Boolean);
  }, [config?.images]);

  const titles = React.useMemo(() => {
    return (config?.titles || '').split(',').map(t => t.trim()).filter(Boolean);
  }, [config?.titles]);

  const subtitles = React.useMemo(() => {
    return (config?.subtitles || '').split(',').map(s => s.trim()).filter(Boolean);
  }, [config?.subtitles]);

  const autoPlay = config?.autoPlay !== false;
  const slideDuration = parseInt(config?.slideDuration || '8') * 1000;
  const kenBurnsIntensity = config?.kenBurnsIntensity || 'medium';
  const transitionDuration = parseInt(config?.transitionDuration || '1200');
  const showTextOverlay = config?.showTextOverlay !== false;
  const textPosition = config?.textPosition || 'center';
  const overlayColor = config?.overlayColor || '#000000';
  const overlayOpacity = parseFloat(config?.overlayOpacity || '0.3');
  const textColor = config?.textColor || '#FFFFFF';
  const titleFontSize = parseInt(config?.titleFontSize || '72');
  const subtitleFontSize = parseInt(config?.subtitleFontSize || '24');
  const fontWeight = config?.fontWeight || '300';
  const letterSpacing = config?.letterSpacing || '0.05em';

  const kenBurnsScale = {
    subtle: { from: 1.0, to: 1.1 },
    medium: { from: 1.0, to: 1.15 },
    dramatic: { from: 1.0, to: 1.25 }
  }[kenBurnsIntensity];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Character-by-character text animation
  React.useEffect(() => {
    if (prefersReducedMotion || !showTextOverlay) {
      setAnimatedChars(new Set(Array.from({ length: 200 }, (_, i) => i)));
      return;
    }

    setAnimatedChars(new Set());
    const currentTitle = titles[currentIndex] || '';
    const currentSubtitle = subtitles[currentIndex] || '';
    const totalChars = currentTitle.length + currentSubtitle.length;

    const animateCharacters = () => {
      for (let i = 0; i < totalChars; i++) {
        setTimeout(() => {
          setAnimatedChars(prev => {
            const newSet = new Set(prev);
            newSet.add(i);
            return newSet;
          });
        }, i * 40 + 600);
      }
    };

    const timer = setTimeout(animateCharacters, 300);
    return () => clearTimeout(timer);
  }, [currentIndex, titles, subtitles, showTextOverlay, prefersReducedMotion]);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, slideDuration);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, slideDuration, images.length]);

  if (images.length === 0) {
    return (
      <div
        className="ken-burns-gallery"
        style={{
          backgroundColor: '#F8F9FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px',
          textAlign: 'center',
          color: '#71717A'
        }}
      >
        <div>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No images provided</p>
          <p style={{ fontSize: '14px', opacity: 0.7 }}>Add comma-separated image URLs</p>
        </div>
      </div>
    );
  }

  const currentTitle = titles[currentIndex] || '';
  const currentSubtitle = subtitles[currentIndex] || '';
  const titleChars = currentTitle.split('');
  const subtitleChars = currentSubtitle.split('');

  const getTextPositionStyles = () => {
    const base = {
      position: 'absolute',
      zIndex: 20,
      textAlign: 'center'
    };

    switch (textPosition) {
      case 'center':
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '1200px' };
      case 'bottom-left':
        return { ...base, bottom: '80px', left: '80px', textAlign: 'left', maxWidth: '600px' };
      case 'bottom-center':
        return { ...base, bottom: '80px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '1200px' };
      case 'top-left':
        return { ...base, top: '80px', left: '80px', textAlign: 'left', maxWidth: '600px' };
      default:
        return base;
    }
  };

  return (
    <div
      className="ken-burns-gallery"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000'
      }}
    >
      {/* Image Layers with Ken Burns Effect */}
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === (currentIndex - 1 + images.length) % images.length;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: isActive ? 1 : 0,
              transition: prefersReducedMotion
                ? 'none'
                : `opacity ${transitionDuration}ms ease`,
              zIndex: isActive ? 10 : 5,
              pointerEvents: 'none'
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: prefersReducedMotion
                  ? 'scale(1)'
                  : isActive
                  ? `scale(${kenBurnsScale.to})`
                  : `scale(${kenBurnsScale.from})`,
                transition: prefersReducedMotion
                  ? 'none'
                  : `transform ${slideDuration}ms linear`,
                willChange: 'transform'
              }}
            />
          </div>
        );
      })}

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
          zIndex: 15,
          pointerEvents: 'none'
        }}
      />

      {/* Text Overlay */}
      {showTextOverlay && (
        <div style={getTextPositionStyles()}>
          {/* Title */}
          <h1
            style={{
              margin: 0,
              padding: 0,
              fontSize: titleFontSize + 'px',
              fontWeight,
              letterSpacing,
              color: textColor,
              lineHeight: 1.2,
              marginBottom: '16px'
            }}
          >
            {titleChars.map((char, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: prefersReducedMotion ? 1 : (animatedChars.has(i) ? 1 : 0),
                  transform: prefersReducedMotion ? 'none' : (animatedChars.has(i) ? 'translateY(0)' : 'translateY(20px)'),
                  transition: prefersReducedMotion ? 'none' : 'opacity 400ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                  marginRight: char === ' ' ? '0.25em' : '0'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          {currentSubtitle && (
            <p
              style={{
                margin: 0,
                padding: 0,
                fontSize: subtitleFontSize + 'px',
                fontWeight: '400',
                letterSpacing: '0.025em',
                color: textColor,
                opacity: 0.9,
                lineHeight: 1.5
              }}
            >
              {subtitleChars.map((char, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: prefersReducedMotion ? 1 : (animatedChars.has(titleChars.length + i) ? 1 : 0),
                    transform: prefersReducedMotion ? 'none' : (animatedChars.has(titleChars.length + i) ? 'translateY(0)' : 'translateY(20px)'),
                    transition: prefersReducedMotion ? 'none' : 'opacity 400ms ease, transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                    marginRight: char === ' ' ? '0.25em' : '0'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          )}
        </div>
      )}
    </div>
  );
}


