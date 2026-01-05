const MANIFEST = {
  "type": "ComplexSlideshows.BentoGridMorphingSlideshow",
  "description": "Bento grid layout that morphs thumbnails into full-screen slideshow",
  "editorElement": {
    "selector": ".bento-grid-slideshow",
    "displayName": "Bento Grid Morphing Slideshow",
    "archetype": "container",
    "data": {
      "images": {
        "dataType": "text",
        "displayName": "Image URLs",
        "defaultValue": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800,https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800,https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800,https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800,https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800,https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
        "group": "Content",
        "description": "Comma-separated image URLs"
      },
      "titles": {
        "dataType": "text",
        "displayName": "Image Titles",
        "defaultValue": "Modern Design,Creative Work,Natural Beauty,Urban Life,Mountain Views,Ocean Waves",
        "group": "Content",
        "description": "Comma-separated titles (one per image)"
      },
      "gridGap": {
        "dataType": "select",
        "displayName": "Grid Gap (px)",
        "defaultValue": "12",
        "options": ["8", "12", "16", "20", "24"],
        "group": "Layout"
      },
      "morphDuration": {
        "dataType": "select",
        "displayName": "Morph Duration (ms)",
        "defaultValue": "600",
        "options": ["400", "500", "600", "700", "800"],
        "group": "Animation"
      },
      "showTitles": {
        "dataType": "booleanValue",
        "displayName": "Show Titles in Grid",
        "defaultValue": true,
        "group": "Content"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "gridItemBackground": {
        "dataType": "color",
        "displayName": "Grid Item Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "overlayColor": {
        "dataType": "color",
        "displayName": "Fullscreen Overlay",
        "defaultValue": "#000000",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "closeButtonColor": {
        "dataType": "color",
        "displayName": "Close Button Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 14,
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
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const images = React.useMemo(() => {
    return (config?.images || '').split(',').map(url => url.trim()).filter(Boolean);
  }, [config?.images]);

  const titles = React.useMemo(() => {
    return (config?.titles || '').split(',').map(t => t.trim()).filter(Boolean);
  }, [config?.titles]);

  const gridGap = parseInt(config?.gridGap || '12');
  const morphDuration = parseInt(config?.morphDuration || '600');
  const showTitles = config?.showTitles !== false;
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const gridItemBackground = config?.gridItemBackground || '#FFFFFF';
  const overlayColor = config?.overlayColor || '#000000';
  const titleColor = config?.titleColor || '#FFFFFF';
  const closeButtonColor = config?.closeButtonColor || '#FFFFFF';
  const titleFontSize = parseInt(config?.titleFontSize || '14');
  const fontWeight = config?.fontWeight || '400';

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleItemClick = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, morphDuration);
  };

  const handleClose = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(null);
      setIsTransitioning(false);
    }, morphDuration);
  };

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Escape' && activeIndex !== null) {
      handleClose();
    } else if (e.key === 'ArrowLeft' && activeIndex !== null && activeIndex > 0) {
      handleItemClick(activeIndex - 1);
    } else if (e.key === 'ArrowRight' && activeIndex !== null && activeIndex < images.length - 1) {
      handleItemClick(activeIndex + 1);
    }
  }, [activeIndex, images.length]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (images.length === 0) {
    return (
      <div
        className="bento-grid-slideshow"
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

  const getGridItemSize = (index) => {
    const patterns = [
      { row: 1, col: 2 },  // Large horizontal
      { row: 1, col: 1 },  // Small square
      { row: 1, col: 1 },  // Small square
      { row: 2, col: 1 },  // Large vertical
      { row: 1, col: 1 },  // Small square
      { row: 1, col: 1 }   // Small square
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div
      className="bento-grid-slideshow"
      style={{
        backgroundColor,
        padding: '40px',
        minHeight: '600px',
        position: 'relative'
      }}
    >
      {/* Bento Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '200px',
          gap: gridGap + 'px',
          maxWidth: '1200px',
          margin: '0 auto',
          opacity: activeIndex !== null ? 0 : 1,
          transform: activeIndex !== null ? 'scale(0.95)' : 'scale(1)',
          transition: prefersReducedMotion ? 'none' : `all ${morphDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          pointerEvents: activeIndex !== null ? 'none' : 'auto'
        }}
      >
        {images.map((image, index) => {
          const size = getGridItemSize(index);
          return (
            <button
              key={index}
              onClick={() => handleItemClick(index)}
              style={{
                gridRow: `span ${size.row}`,
                gridColumn: `span ${size.col}`,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                backgroundColor: gridItemBackground,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: prefersReducedMotion ? 'none' : 'transform 200ms ease, box-shadow 200ms ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              }}
            >
              <img
                src={image}
                alt={titles[index] || `Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {showTitles && titles[index] && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    color: titleColor,
                    fontSize: titleFontSize + 'px',
                    fontWeight,
                    textAlign: 'left'
                  }}
                >
                  {titles[index]}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Fullscreen View */}
      {activeIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: overlayColor,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isTransitioning ? 0 : 1,
            transition: prefersReducedMotion ? 'none' : `opacity ${morphDuration}ms ease`
          }}
        >
          <img
            src={images[activeIndex]}
            alt={titles[activeIndex] || `Image ${activeIndex + 1}`}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              transform: isTransitioning ? 'scale(0.9)' : 'scale(1)',
              transition: prefersReducedMotion ? 'none' : `transform ${morphDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
            }}
          />

          {/* Title Overlay */}
          {titles[activeIndex] && (
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: titleColor,
                fontSize: '24px',
                fontWeight: '300',
                textAlign: 'center',
                maxWidth: '80%'
              }}
            >
              {titles[activeIndex]}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close fullscreen"
            style={{
              position: 'absolute',
              top: '32px',
              right: '32px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: `1px solid ${closeButtonColor}40`,
              color: closeButtonColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 200ms ease',
              fontSize: '24px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
            }}
          >
            ×
          </button>

          {/* Navigation Arrows */}
          {activeIndex > 0 && (
            <button
              onClick={() => handleItemClick(activeIndex - 1)}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: '32px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: closeButtonColor,
                fontSize: '48px',
                cursor: 'pointer',
                opacity: 0.7,
                transition: 'opacity 200ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              ←
            </button>
          )}

          {activeIndex < images.length - 1 && (
            <button
              onClick={() => handleItemClick(activeIndex + 1)}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: '32px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: closeButtonColor,
                fontSize: '48px',
                cursor: 'pointer',
                opacity: 0.7,
                transition: 'opacity 200ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              →
            </button>
          )}
        </div>
      )}
    </div>
  );
}


