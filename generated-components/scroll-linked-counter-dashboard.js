const MANIFEST = {
  "type": "ScrollAnimations.ScrollLinkedCounterDashboard",
  "description": "Statistics dashboard with numbers that count up from 0 when scrolled into view",
  "editorElement": {
    "selector": ".counter-dashboard",
    "displayName": "Scroll-Linked Counter Dashboard",
    "archetype": "container",
    "data": {
      "stat1Label": {
        "dataType": "text",
        "displayName": "Stat 1 Label",
        "defaultValue": "Projects Completed",
        "group": "Content"
      },
      "stat1Value": {
        "dataType": "text",
        "displayName": "Stat 1 Value",
        "defaultValue": "1250",
        "group": "Content"
      },
      "stat1Suffix": {
        "dataType": "text",
        "displayName": "Stat 1 Suffix",
        "defaultValue": "+",
        "group": "Content"
      },
      "stat2Label": {
        "dataType": "text",
        "displayName": "Stat 2 Label",
        "defaultValue": "Client Satisfaction",
        "group": "Content"
      },
      "stat2Value": {
        "dataType": "text",
        "displayName": "Stat 2 Value",
        "defaultValue": "98.5",
        "group": "Content"
      },
      "stat2Suffix": {
        "dataType": "text",
        "displayName": "Stat 2 Suffix",
        "defaultValue": "%",
        "group": "Content"
      },
      "stat3Label": {
        "dataType": "text",
        "displayName": "Stat 3 Label",
        "defaultValue": "Years Experience",
        "group": "Content"
      },
      "stat3Value": {
        "dataType": "text",
        "displayName": "Stat 3 Value",
        "defaultValue": "15",
        "group": "Content"
      },
      "stat3Suffix": {
        "dataType": "text",
        "displayName": "Stat 3 Suffix",
        "defaultValue": "",
        "group": "Content"
      },
      "stat4Label": {
        "dataType": "text",
        "displayName": "Stat 4 Label",
        "defaultValue": "Team Members",
        "group": "Content"
      },
      "stat4Value": {
        "dataType": "text",
        "displayName": "Stat 4 Value",
        "defaultValue": "42",
        "group": "Content"
      },
      "stat4Suffix": {
        "dataType": "text",
        "displayName": "Stat 4 Suffix",
        "defaultValue": "",
        "group": "Content"
      },
      "countDuration": {
        "dataType": "select",
        "displayName": "Count Duration (ms)",
        "defaultValue": "2000",
        "options": ["1000", "1500", "2000", "2500", "3000"],
        "group": "Animation"
      },
      "triggerThreshold": {
        "dataType": "select",
        "displayName": "Scroll Trigger Threshold",
        "defaultValue": "0.3",
        "options": ["0.1", "0.2", "0.3", "0.5"],
        "group": "Animation"
      },
      "showProgressBars": {
        "dataType": "booleanValue",
        "displayName": "Show Progress Bars",
        "defaultValue": true,
        "group": "Content"
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
      "numberColor": {
        "dataType": "color",
        "displayName": "Number Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "labelColor": {
        "dataType": "color",
        "displayName": "Label Color",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "progressBarColor": {
        "dataType": "color",
        "displayName": "Progress Bar Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "progressBarBackground": {
        "dataType": "color",
        "displayName": "Progress Bar Background",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Card Border Color",
        "defaultValue": "#E9ECEF",
        "group": "Colors"
      },
      "numberFontSize": {
        "dataType": "number",
        "displayName": "Number Font Size (px)",
        "defaultValue": 56,
        "group": "Typography"
      },
      "labelFontSize": {
        "dataType": "number",
        "displayName": "Label Font Size (px)",
        "defaultValue": 14,
        "group": "Typography"
      },
      "fontWeight": {
        "dataType": "select",
        "displayName": "Number Font Weight",
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
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [currentValues, setCurrentValues] = React.useState([0, 0, 0, 0]);
  const containerRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);
  const startTimeRef = React.useRef(null);

  const stats = [
    {
      label: config?.stat1Label || 'Projects Completed',
      value: parseFloat(config?.stat1Value || '1250'),
      suffix: config?.stat1Suffix || '+'
    },
    {
      label: config?.stat2Label || 'Client Satisfaction',
      value: parseFloat(config?.stat2Value || '98.5'),
      suffix: config?.stat2Suffix || '%'
    },
    {
      label: config?.stat3Label || 'Years Experience',
      value: parseFloat(config?.stat3Value || '15'),
      suffix: config?.stat3Suffix || ''
    },
    {
      label: config?.stat4Label || 'Team Members',
      value: parseFloat(config?.stat4Value || '42'),
      suffix: config?.stat4Suffix || ''
    }
  ];

  const countDuration = parseInt(config?.countDuration || '2000');
  const triggerThreshold = parseFloat(config?.triggerThreshold || '0.3');
  const showProgressBars = config?.showProgressBars !== false;
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const cardBackground = config?.cardBackground || '#FFFFFF';
  const numberColor = config?.numberColor || '#212529';
  const labelColor = config?.labelColor || '#6C757D';
  const progressBarColor = config?.progressBarColor || '#495057';
  const progressBarBackground = config?.progressBarBackground || '#E9ECEF';
  const borderColor = config?.borderColor || '#E9ECEF';
  const numberFontSize = parseInt(config?.numberFontSize || '56');
  const labelFontSize = parseInt(config?.labelFontSize || '14');
  const fontWeight = config?.fontWeight || '300';

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animateCounters = () => {
    if (prefersReducedMotion) {
      setCurrentValues(stats.map(s => s.value));
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / countDuration, 1);
      const easedProgress = easeOutCubic(progress);

      setCurrentValues(stats.map(stat => stat.value * easedProgress));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: triggerThreshold }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasAnimated, triggerThreshold]);

  const formatNumber = (num, targetValue) => {
    const hasDecimal = targetValue % 1 !== 0;
    return hasDecimal ? num.toFixed(1) : Math.floor(num).toString();
  };

  const getProgress = (index) => {
    return (currentValues[index] / stats[index].value) * 100;
  };

  return (
    <div
      ref={containerRef}
      className="counter-dashboard"
      style={{
        backgroundColor,
        padding: '80px 40px',
        minHeight: '400px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px'
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'transform 200ms ease, box-shadow 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            }}
          >
            <div
              style={{
                fontSize: numberFontSize + 'px',
                fontWeight,
                color: numberColor,
                lineHeight: 1,
                marginBottom: '12px',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {formatNumber(currentValues[index], stat.value)}
              <span style={{ fontSize: numberFontSize * 0.6 + 'px' }}>
                {stat.suffix}
              </span>
            </div>

            <div
              style={{
                fontSize: labelFontSize + 'px',
                fontWeight: '400',
                color: labelColor,
                letterSpacing: '0.025em',
                textTransform: 'uppercase',
                marginBottom: showProgressBars ? '16px' : '0'
              }}
            >
              {stat.label}
            </div>

            {showProgressBars && (
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: progressBarBackground,
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: prefersReducedMotion ? '100%' : getProgress(index) + '%',
                    backgroundColor: progressBarColor,
                    transition: prefersReducedMotion ? 'none' : 'width 200ms ease',
                    borderRadius: '2px'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

