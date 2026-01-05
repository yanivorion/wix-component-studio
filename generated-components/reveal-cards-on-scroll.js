const MANIFEST = {
  "type": "ScrollAnimations.RevealCardsOnScroll",
  "description": "Cards that reveal and animate into view as you scroll using Framer Motion",
  "editorElement": {
    "selector": ".reveal-cards-scroll",
    "displayName": "Reveal Cards On Scroll",
    "archetype": "container",
    "data": {
      "cardTitles": {
        "dataType": "text",
        "displayName": "Card Titles",
        "defaultValue": "Innovation,Design,Technology,Performance,Excellence,Quality",
        "group": "Content",
        "description": "Comma-separated card titles"
      },
      "cardDescriptions": {
        "dataType": "text",
        "displayName": "Card Descriptions",
        "defaultValue": "Leading the future,Beautiful interfaces,Cutting edge,Lightning fast,Premium quality,Built to last",
        "group": "Content",
        "description": "Comma-separated descriptions"
      },
      "animationStyle": {
        "dataType": "select",
        "displayName": "Animation Style",
        "defaultValue": "fadeUp",
        "options": ["fadeUp", "fadeIn", "scale", "slideLeft", "rotate"],
        "group": "Animation"
      },
      "staggerDelay": {
        "dataType": "select",
        "displayName": "Stagger Delay (ms)",
        "defaultValue": "100",
        "options": ["50", "100", "150", "200"],
        "group": "Animation"
      },
      "triggerOnce": {
        "dataType": "booleanValue",
        "displayName": "Animate Only Once",
        "defaultValue": true,
        "group": "Animation"
      },
      "cardWidth": {
        "dataType": "select",
        "displayName": "Card Width",
        "defaultValue": "300",
        "options": ["250", "300", "350", "400"],
        "group": "Layout"
      },
      "cardHeight": {
        "dataType": "select",
        "displayName": "Card Height",
        "defaultValue": "200",
        "options": ["150", "200", "250", "300"],
        "group": "Layout"
      },
      "cardsPerRow": {
        "dataType": "select",
        "displayName": "Cards Per Row",
        "defaultValue": "3",
        "options": ["2", "3", "4"],
        "group": "Layout"
      },
      "cardColor": {
        "dataType": "color",
        "displayName": "Card Color",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "titleFontSize": {
        "dataType": "number",
        "displayName": "Title Font Size (px)",
        "defaultValue": 24,
        "group": "Typography"
      },
      "descriptionFontSize": {
        "dataType": "number",
        "displayName": "Description Font Size (px)",
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
  const cardTitles = React.useMemo(() => {
    return (config?.cardTitles || '').split(',').map(t => t.trim()).filter(Boolean);
  }, [config?.cardTitles]);

  const cardDescriptions = React.useMemo(() => {
    return (config?.cardDescriptions || '').split(',').map(d => d.trim()).filter(Boolean);
  }, [config?.cardDescriptions]);

  const animationStyle = config?.animationStyle || 'fadeUp';
  const staggerDelay = parseInt(config?.staggerDelay || '100') / 1000;
  const triggerOnce = config?.triggerOnce !== false;
  const cardWidth = parseInt(config?.cardWidth || '300');
  const cardHeight = parseInt(config?.cardHeight || '200');
  const cardsPerRow = parseInt(config?.cardsPerRow || '3');
  const cardColor = config?.cardColor || '#FFFFFF';
  const textColor = config?.textColor || '#212529';
  const accentColor = config?.accentColor || '#495057';
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const titleFontSize = parseInt(config?.titleFontSize || '24');
  const descriptionFontSize = parseInt(config?.descriptionFontSize || '14');
  const fontWeight = config?.fontWeight || '400';

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const animationVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 }
    },
    rotate: {
      hidden: { opacity: 0, rotateY: -45, scale: 0.9 },
      visible: { opacity: 1, rotateY: 0, scale: 1 }
    }
  };

  const variant = animationVariants[animationStyle];

  if (cardTitles.length === 0) {
    return (
      <div
        className="reveal-cards-scroll"
        style={{
          backgroundColor,
          padding: '80px 40px',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: textColor
        }}
      >
        <div>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No cards configured</p>
          <p style={{ fontSize: '14px', opacity: 0.7 }}>Add comma-separated titles</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="reveal-cards-scroll"
      style={{
        backgroundColor,
        padding: '80px 40px',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cardsPerRow}, ${cardWidth}px)`,
          gap: '32px',
          justifyContent: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {cardTitles.map((title, index) => (
          <Card
            key={index}
            title={title}
            description={cardDescriptions[index] || ''}
            index={index}
            variant={variant}
            staggerDelay={staggerDelay}
            triggerOnce={triggerOnce}
            prefersReducedMotion={prefersReducedMotion}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            cardColor={cardColor}
            textColor={textColor}
            accentColor={accentColor}
            titleFontSize={titleFontSize}
            descriptionFontSize={descriptionFontSize}
            fontWeight={fontWeight}
          />
        ))}
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  index,
  variant,
  staggerDelay,
  triggerOnce,
  prefersReducedMotion,
  cardWidth,
  cardHeight,
  cardColor,
  textColor,
  accentColor,
  titleFontSize,
  descriptionFontSize,
  fontWeight
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-100px" });

  if (prefersReducedMotion) {
    return (
      <div
        ref={ref}
        style={{
          width: cardWidth + 'px',
          height: cardHeight + 'px',
          backgroundColor: cardColor,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: accentColor,
            marginBottom: '16px',
            borderRadius: '2px'
          }}
        />
        <h3
          style={{
            margin: 0,
            fontSize: titleFontSize + 'px',
            fontWeight: '500',
            color: textColor,
            marginBottom: '8px'
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              margin: 0,
              fontSize: descriptionFontSize + 'px',
              fontWeight,
              color: textColor,
              opacity: 0.7,
              lineHeight: 1.5
            }}
          >
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{
        duration: 0.6,
        delay: index * staggerDelay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
      }}
      style={{
        width: cardWidth + 'px',
        height: cardHeight + 'px',
        backgroundColor: cardColor,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: '40px' } : { width: 0 }}
        transition={{ duration: 0.4, delay: index * staggerDelay + 0.3 }}
        style={{
          height: '4px',
          backgroundColor: accentColor,
          marginBottom: '16px',
          borderRadius: '2px'
        }}
      />
      <h3
        style={{
          margin: 0,
          fontSize: titleFontSize + 'px',
          fontWeight: '500',
          color: textColor,
          marginBottom: '8px'
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            margin: 0,
            fontSize: descriptionFontSize + 'px',
            fontWeight,
            color: textColor,
            opacity: 0.7,
            lineHeight: 1.5
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

