const MANIFEST = {
  "type": "MouseTracking.MagneticCardTiltGallery",
  "description": "Grid of cards that tilt in 3D based on mouse position with dynamic shadows",
  "editorElement": {
    "selector": ".magnetic-card-gallery",
    "displayName": "Magnetic Card Tilt Gallery",
    "archetype": "container",
    "data": {
      "card1Title": {
        "dataType": "text",
        "displayName": "Card 1 Title",
        "defaultValue": "Premium Design",
        "group": "Content"
      },
      "card1Image": {
        "dataType": "text",
        "displayName": "Card 1 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
        "group": "Content"
      },
      "card2Title": {
        "dataType": "text",
        "displayName": "Card 2 Title",
        "defaultValue": "Modern Architecture",
        "group": "Content"
      },
      "card2Image": {
        "dataType": "text",
        "displayName": "Card 2 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600",
        "group": "Content"
      },
      "card3Title": {
        "dataType": "text",
        "displayName": "Card 3 Title",
        "defaultValue": "Elegant Simplicity",
        "group": "Content"
      },
      "card3Image": {
        "dataType": "text",
        "displayName": "Card 3 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618005198918-6eb1ec5dc0cf?w=600",
        "group": "Content"
      },
      "card4Title": {
        "dataType": "text",
        "displayName": "Card 4 Title",
        "defaultValue": "Timeless Quality",
        "group": "Content"
      },
      "card4Image": {
        "dataType": "text",
        "displayName": "Card 4 Image URL",
        "defaultValue": "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600",
        "group": "Content"
      },
      "gridColumns": {
        "dataType": "select",
        "displayName": "Grid Columns",
        "defaultValue": "2",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "tiltIntensity": {
        "dataType": "select",
        "displayName": "Tilt Intensity",
        "defaultValue": "medium",
        "options": ["subtle", "medium", "dramatic"],
        "group": "Animation"
      },
      "shineEffect": {
        "dataType": "booleanValue",
        "displayName": "Show Shine Effect",
        "defaultValue": true,
        "group": "Animation"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "titleColor": {
        "dataType": "color",
        "displayName": "Title Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 20,
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
  const [cardStates, setCardStates] = React.useState([
    { tiltX: 0, tiltY: 0, shineX: 50, shineY: 50 },
    { tiltX: 0, tiltY: 0, shineX: 50, shineY: 50 },
    { tiltX: 0, tiltY: 0, shineX: 50, shineY: 50 },
    { tiltX: 0, tiltY: 0, shineX: 50, shineY: 50 }
  ]);

  const cards = [
    {
      title: config?.card1Title || 'Premium Design',
      image: config?.card1Image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'
    },
    {
      title: config?.card2Title || 'Modern Architecture',
      image: config?.card2Image || 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600'
    },
    {
      title: config?.card3Title || 'Elegant Simplicity',
      image: config?.card3Image || 'https://images.unsplash.com/photo-1618005198918-6eb1ec5dc0cf?w=600'
    },
    {
      title: config?.card4Title || 'Timeless Quality',
      image: config?.card4Image || 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600'
    }
  ];

  const gridColumns = parseInt(config?.gridColumns || '2');
  const tiltIntensity = config?.tiltIntensity || 'medium';
  const shineEffect = config?.shineEffect !== false;
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const cardBackground = config?.cardBackground || '#FFFFFF';
  const titleColor = config?.titleColor || '#212529';
  const borderColor = config?.borderColor || '#E9ECEF';
  const titleFontSize = parseInt(config?.titleFontSize || '20');
  const fontWeight = config?.fontWeight || '400';

  const tiltMultiplier = {
    subtle: 5,
    medium: 10,
    dramatic: 15
  }[tiltIntensity];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleMouseMove = (e, cardIndex) => {
    if (prefersReducedMotion) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (y - 0.5) * tiltMultiplier;
    const tiltY = (x - 0.5) * -tiltMultiplier;
    const shineX = x * 100;
    const shineY = y * 100;

    setCardStates(prev => {
      const newStates = [...prev];
      newStates[cardIndex] = { tiltX, tiltY, shineX, shineY };
      return newStates;
    });
  };

  const handleMouseLeave = (cardIndex) => {
    setCardStates(prev => {
      const newStates = [...prev];
      newStates[cardIndex] = { tiltX: 0, tiltY: 0, shineX: 50, shineY: 50 };
      return newStates;
    });
  };

  return (
    <div
      className="magnetic-card-gallery"
      style={{
        backgroundColor,
        padding: '80px 40px',
        minHeight: '600px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: '32px'
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              style={{
                backgroundColor: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: prefersReducedMotion
                  ? '0 2px 8px rgba(0,0,0,0.06)'
                  : `${cardStates[index].tiltY * -1}px ${cardStates[index].tiltX}px 20px rgba(0,0,0,0.1)`,
                transform: prefersReducedMotion
                  ? 'none'
                  : `rotateX(${cardStates[index].tiltX}deg) rotateY(${cardStates[index].tiltY}deg) translateZ(0)`,
                transition: prefersReducedMotion
                  ? 'none'
                  : 'transform 200ms ease-out, box-shadow 200ms ease-out',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '280px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Shine Effect */}
                {shineEffect && !prefersReducedMotion && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle at ${cardStates[index].shineX}% ${cardStates[index].shineY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                      pointerEvents: 'none',
                      transition: 'background 200ms ease-out'
                    }}
                  />
                )}
              </div>

              {/* Title */}
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: titleFontSize + 'px',
                    fontWeight,
                    color: titleColor,
                    letterSpacing: '0.025em',
                    lineHeight: 1.4
                  }}
                >
                  {card.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


