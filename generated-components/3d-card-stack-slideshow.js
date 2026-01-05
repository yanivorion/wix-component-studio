const MANIFEST = {
  "type": "ComplexSlideshows.CardStackSlideshow3D",
  "description": "3D card stack slideshow with flip animations and parallax mouse tilt",
  "editorElement": {
    "selector": ".card-stack-slideshow",
    "displayName": "3D Card Stack Slideshow",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800,https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
        "group": "Content",
        "description": "Comma-separated image URLs"
      },
      "autoPlay": {
        "dataType": "booleanValue",
        "displayName": "Auto Play",
        "defaultValue": false,
        "group": "Content"
      },
      "autoPlayInterval": {
        "dataType": "select",
        "displayName": "Auto Play Interval (seconds)",
        "defaultValue": "5",
        "options": ["3", "4", "5", "6", "8", "10"],
        "group": "Content"
      },
      "showNavigation": {
        "dataType": "booleanValue",
        "displayName": "Show Navigation Arrows",
        "defaultValue": true,
        "group": "Content"
      },
      "showIndicators": {
        "dataType": "booleanValue",
        "displayName": "Show Progress Indicators",
        "defaultValue": true,
        "group": "Content"
      },
      "stackDepth": {
        "dataType": "select",
        "displayName": "Visible Cards in Stack",
        "defaultValue": "3",
        "options": ["2", "3", "4", "5"],
        "group": "Layout"
      },
      "cardSpacing": {
        "dataType": "select",
        "displayName": "Card Spacing (px)",
        "defaultValue": "20",
        "options": ["10", "15", "20", "25", "30"],
        "group": "Layout"
      },
      "parallaxIntensity": {
        "dataType": "select",
        "displayName": "Parallax Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "strong"],
        "group": "Animation"
      },
      "flipDuration": {
        "dataType": "select",
        "displayName": "Flip Duration (ms)",
        "defaultValue": "800",
        "options": ["600", "700", "800", "900", "1000"],
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBorderColor": {
        "dataType": "color",
        "displayName": "Card Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "arrowColor": {
        "dataType": "color",
        "displayName": "Arrow Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "arrowHoverColor": {
        "dataType": "color",
        "displayName": "Arrow Hover Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "indicatorColor": {
        "dataType": "color",
        "displayName": "Indicator Color",
        "defaultValue": "#DEE2E6",
        "group": "Colors"
      },
      "indicatorActiveColor": {
        "dataType": "color",
        "displayName": "Active Indicator Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "borderRadius": {
        "dataType": "select",
        "displayName": "Card Border Radius (px)",
        "defaultValue": "8",
        "options": ["0", "4", "8", "12", "16"],
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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipping, setIsFlipping] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef(null);
  const autoPlayTimerRef = React.useRef(null);

  const images = React.useMemo(() => {
    return (config?.images || '')
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);
  }, [config?.images]);

  const autoPlay = config?.autoPlay !== false;
  const autoPlayInterval = parseInt(config?.autoPlayInterval || '5') * 1000;
  const showNavigation = config?.showNavigation !== false;
  const showIndicators = config?.showIndicators !== false;
  const stackDepth = parseInt(config?.stackDepth || '3');
  const cardSpacing = parseInt(config?.cardSpacing || '20');
  const flipDuration = parseInt(config?.flipDuration || '800');
  const borderRadius = parseInt(config?.borderRadius || '8');

  const parallaxIntensity = config?.parallaxIntensity || 'medium';
  const parallaxMultiplier = {
    subtle: 0.5,
    medium: 1.0,
    strong: 1.5
  }[parallaxIntensity];

  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const cardBorderColor = config?.cardBorderColor || '#E9ECEF';
  const arrowColor = config?.arrowColor || '#495057';
  const arrowHoverColor = config?.arrowHoverColor || '#212529';
  const indicatorColor = config?.indicatorColor || '#DEE2E6';
  const indicatorActiveColor = config?.indicatorActiveColor || '#495057';

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Mouse move parallax effect
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || isFlipping) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, isFlipping, currentIndex]);

  const handleNext = () => {
    if (isFlipping || images.length === 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsFlipping(false);
    }, flipDuration);
  };

  const handlePrev = () => {
    if (isFlipping || images.length === 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsFlipping(false);
    };
  };

  const handleIndicatorClick = (index) => {
    if (isFlipping || index === currentIndex) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFlipping(false);
    }, flipDuration);
  };

  if (images.length === 0) {
    return (
      <div
        className="card-stack-slideshow"
        style={{
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '600px',
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

  const tiltX = mousePosition.y * 5 * parallaxMultiplier;
  const tiltY = mousePosition.x * -5 * parallaxMultiplier;

  return (
    <div
      ref={containerRef}
      className="card-stack-slideshow"
      style={{
        backgroundColor,
        position: 'relative',
        width: '100%',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        overflow: 'hidden',
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Card Stack */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          height: '500px',
          transform: prefersReducedMotion
            ? 'none'
            : `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 200ms ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {images.slice(0, stackDepth).map((image, i) => {
          const cardIndex = (currentIndex + i) % images.length;
          const isTopCard = i === 0;
          const zIndex = stackDepth - i;
          const translateZ = -i * cardSpacing;
          const scale = 1 - i * 0.05;

          return (
            <div
              key={cardIndex}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: borderRadius + 'px',
                border: `1px solid ${cardBorderColor}`,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                transform: prefersReducedMotion
                  ? `translateZ(${translateZ}px) scale(${scale})`
                  : isFlipping && isTopCard
                  ? `translateZ(${translateZ}px) scale(${scale}) rotateY(90deg) translateX(200px)`
                  : `translateZ(${translateZ}px) scale(${scale})`,
                opacity: isFlipping && isTopCard ? 0 : 1,
                transition: prefersReducedMotion
                  ? 'none'
                  : `transform ${flipDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${flipDuration / 2}ms ease`,
                zIndex,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                pointerEvents: 'none'
              }}
            >
              <img
                src={image}
                alt={`Slide ${cardIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            disabled={isFlipping}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: isFlipping ? 'default' : 'pointer',
              padding: '12px',
              fontSize: '32px',
              color: isFlipping ? indicatorColor : arrowColor,
              opacity: isFlipping ? 0.5 : 0.7,
              transition: 'opacity 200ms ease, color 200ms ease',
              zIndex: 100
            }}
            onMouseEnter={(e) => !isFlipping && (e.target.style.opacity = '1', e.target.style.color = arrowHoverColor)}
            onMouseLeave={(e) => !isFlipping && (e.target.style.opacity = '0.7', e.target.style.color = arrowColor)}
          >
            ←
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            disabled={isFlipping}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: isFlipping ? 'default' : 'pointer',
              padding: '12px',
              fontSize: '32px',
              color: isFlipping ? indicatorColor : arrowColor,
              opacity: isFlipping ? 0.5 : 0.7,
              transition: 'opacity 200ms ease, color 200ms ease',
              zIndex: 100
            }}
            onMouseEnter={(e) => !isFlipping && (e.target.style.opacity = '1', e.target.style.color = arrowHoverColor)}
            onMouseLeave={(e) => !isFlipping && (e.target.style.opacity = '0.7', e.target.style.color = arrowColor)}
          >
            →
          </button>
        </>
      )}

      {/* Progress Indicators */}
      {showIndicators && (
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 100
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
              disabled={isFlipping}
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: 'none',
                border: 'none',
                cursor: isFlipping ? 'default' : 'pointer',
                padding: 0,
                backgroundColor: index === currentIndex ? indicatorActiveColor : indicatorColor,
                transition: 'width 300ms ease, background-color 300ms ease',
                opacity: isFlipping ? 0.5 : 1
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


