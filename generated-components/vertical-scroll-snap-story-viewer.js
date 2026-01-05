const MANIFEST = {
  "type": "ComplexSlideshows.VerticalScrollSnapStoryViewer",
  "description": "Vertical full-height slideshow with snap scrolling like Instagram stories",
  "editorElement": {
    "selector": ".vertical-story-viewer",
    "displayName": "Vertical Scroll-Snap Story Viewer",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1080,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080,https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1080,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080",
        "group": "Content",
        "description": "Comma-separated image URLs"
      },
      "captions": {
        "dataType": "text",
        "displayName": "Captions",
        "defaultValue": "Story 1,Story 2,Story 3,Story 4,Story 5",
        "group": "Content",
        "description": "Comma-separated captions"
      },
      "showProgressBars": {
        "dataType": "booleanValue",
        "displayName": "Show Progress Bars",
        "defaultValue": true,
        "group": "Content"
      },
      "showTapZones": {
        "dataType": "booleanValue",
        "displayName": "Show Tap Zones",
        "defaultValue": true,
        "group": "Content"
      },
      "snapSpeed": {
        "dataType": "select",
        "displayName": "Snap Speed",
        "defaultValue": "medium",
        "options": ["fast", "medium", "slow"],
        "group": "Animation"
      },
      "progressBarColor": {
        "dataType": "color",
        "displayName": "Progress Bar Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "progressBarBackground": {
        "dataType": "color",
        "displayName": "Progress Bar Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "captionColor": {
        "dataType": "color",
        "displayName": "Caption Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
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
        "defaultValue": "0.2",
        "options": ["0.1", "0.2", "0.3", "0.4"],
        "group": "Colors"
      },
      "captionFontSize": {
        "dataType": "number",
        "displayName": "Caption Font Size (px)",
        "defaultValue": 18,
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
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const containerRef = React.useRef(null);
  const scrollTimeoutRef = React.useRef(null);

  const images = React.useMemo(() => {
    return (config?.images || '').split(',').map(url => url.trim()).filter(Boolean);
  }, [config?.images]);

  const captions = React.useMemo(() => {
    return (config?.captions || '').split(',').map(c => c.trim()).filter(Boolean);
  }, [config?.captions]);

  const showProgressBars = config?.showProgressBars !== false;
  const showTapZones = config?.showTapZones !== false;
  const snapSpeed = config?.snapSpeed || 'medium';
  const progressBarColor = config?.progressBarColor || '#FFFFFF';
  const progressBarBackground = config?.progressBarBackground || '#FFFFFF';
  const captionColor = config?.captionColor || '#FFFFFF';
  const overlayColor = config?.overlayColor || '#000000';
  const overlayOpacity = parseFloat(config?.overlayOpacity || '0.2');
  const captionFontSize = parseInt(config?.captionFontSize || '18');
  const fontWeight = config?.fontWeight || '400';

  const scrollBehavior = {
    fast: 'auto',
    medium: 'smooth',
    slow: 'smooth'
  }[snapSpeed];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const itemHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setCurrentIndex(newIndex);
      }
    }, 100);
  };

  const handleTapPrevious = () => {
    if (currentIndex > 0) {
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          top: (currentIndex - 1) * container.clientHeight,
          behavior: scrollBehavior
        });
      }
    }
  };

  const handleTapNext = () => {
    if (currentIndex < images.length - 1) {
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          top: (currentIndex + 1) * container.clientHeight,
          behavior: scrollBehavior
        });
      }
    }
  };

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleTapPrevious();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleTapNext();
    }
  }, [currentIndex, images.length]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (images.length === 0) {
    return (
      <div
        className="vertical-story-viewer"
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
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No stories provided</p>
          <p style={{ fontSize: '14px', opacity: 0.7 }}>Add comma-separated image URLs</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="vertical-story-viewer"
      onScroll={handleScroll}
      style={{
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        position: 'relative'
      }}
    >
      {/* Progress Bars */}
      {showProgressBars && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '4px',
            width: '90%',
            maxWidth: '400px',
            zIndex: 100,
            pointerEvents: 'none'
          }}
        >
          {images.map((_, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                height: '3px',
                backgroundColor: progressBarBackground,
                opacity: 0.3,
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: index === currentIndex ? '100%' : (index < currentIndex ? '100%' : '0%'),
                  height: '100%',
                  backgroundColor: progressBarColor,
                  transition: prefersReducedMotion ? 'none' : 'width 300ms ease',
                  borderRadius: '2px'
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Tap Zones */}
      {showTapZones && (
        <>
          <button
            onClick={handleTapPrevious}
            disabled={currentIndex === 0}
            aria-label="Previous story"
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '30%',
              height: '100vh',
              background: 'transparent',
              border: 'none',
              cursor: currentIndex === 0 ? 'default' : 'pointer',
              zIndex: 50,
              opacity: 0
            }}
          />
          <button
            onClick={handleTapNext}
            disabled={currentIndex === images.length - 1}
            aria-label="Next story"
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              width: '70%',
              height: '100vh',
              background: 'transparent',
              border: 'none',
              cursor: currentIndex === images.length - 1 ? 'default' : 'pointer',
              zIndex: 50,
              opacity: 0
            }}
          />
        </>
      )}

      {/* Stories */}
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            height: '100vh',
            scrollSnapAlign: 'start',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img
            src={image}
            alt={captions[index] || `Story ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

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
              pointerEvents: 'none'
            }}
          />

          {/* Caption */}
          {captions[index] && (
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: captionColor,
                fontSize: captionFontSize + 'px',
                fontWeight,
                textAlign: 'center',
                maxWidth: '80%',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                pointerEvents: 'none'
              }}
            >
              {captions[index]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


