const MANIFEST = {
  "type": "MouseTracking.TrailingParticleCursor",
  "description": "Mouse trail effect with particles that spawn and fade behind cursor",
  "editorElement": {
    "selector": ".trailing-particle-cursor",
    "displayName": "Trailing Particle Cursor",
    "archetype": "container",
    "data": {
      "heading": {
        "dataType": "text",
        "displayName": "Heading Text",
        "defaultValue": "Interactive Experience",
        "group": "Content"
      },
      "description": {
        "dataType": "text",
        "displayName": "Description Text",
        "defaultValue": "Move your mouse to create a trail of particles",
        "group": "Content"
      },
      "particleCount": {
        "dataType": "select",
        "displayName": "Spawn Rate",
        "defaultValue": "medium",
        "options": ["low", "medium", "high", "extreme"],
        "group": "Animation"
      },
      "particleSize": {
        "dataType": "select",
        "displayName": "Particle Size",
        "defaultValue": "medium",
        "options": ["small", "medium", "large"],
        "group": "Animation"
      },
      "fadeSpeed": {
        "dataType": "select",
        "displayName": "Fade Speed",
        "defaultValue": "medium",
        "options": ["slow", "medium", "fast"],
        "group": "Animation"
      },
      "trailColor1": {
        "dataType": "color",
        "displayName": "Trail Color 1",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "trailColor2": {
        "dataType": "color",
        "displayName": "Trail Color 2",
        "defaultValue": "#6C757D",
        "group": "Colors"
      },
      "trailColor3": {
        "dataType": "color",
        "displayName": "Trail Color 3",
        "defaultValue": "#ADB5BD",
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "textColor": {
        "dataType": "color",
        "displayName": "Text Color",
        "defaultValue": "#212529",
        "group": "Colors"
      },
      "headingFontSize": {
        "dataType": "number",
        "displayName": "Heading Font Size (px)",
        "defaultValue": 48,
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
  const [particles, setParticles] = React.useState([]);
  const animationFrameRef = React.useRef(null);
  const lastMousePosRef = React.useRef({ x: 0, y: 0 });
  const particleIdRef = React.useRef(0);
  const lastSpawnTimeRef = React.useRef(0);

  const heading = config?.heading || 'Interactive Experience';
  const description = config?.description || 'Move your mouse to create a trail of particles';
  const particleCount = config?.particleCount || 'medium';
  const particleSize = config?.particleSize || 'medium';
  const fadeSpeed = config?.fadeSpeed || 'medium';
  const trailColor1 = config?.trailColor1 || '#495057';
  const trailColor2 = config?.trailColor2 || '#6C757D';
  const trailColor3 = config?.trailColor3 || '#ADB5BD';
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const textColor = config?.textColor || '#212529';
  const headingFontSize = parseInt(config?.headingFontSize || '48');
  const fontWeight = config?.fontWeight || '300';

  const spawnRate = {
    low: 100,
    medium: 50,
    high: 30,
    extreme: 16
  }[particleCount];

  const sizeRange = {
    small: { min: 3, max: 6 },
    medium: { min: 5, max: 10 },
    large: { min: 8, max: 14 }
  }[particleSize];

  const fadeRate = {
    slow: 0.008,
    medium: 0.015,
    fast: 0.025
  }[fadeSpeed];

  const colors = [trailColor1, trailColor2, trailColor3];

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const updateParticles = () => {
    setParticles(prev => {
      const updated = prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.98,
          vy: p.vy * 0.98,
          life: p.life - fadeRate
        }))
        .filter(p => p.life > 0);

      if (updated.length > 0 || lastMousePosRef.current.isMoving) {
        animationFrameRef.current = requestAnimationFrame(updateParticles);
      }

      return updated;
    });
  };

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    if (particles.length > 0 && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [particles.length, prefersReducedMotion]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;

    const now = Date.now();
    if (now - lastSpawnTimeRef.current < spawnRate) return;

    lastSpawnTimeRef.current = now;

    const newParticle = {
      id: particleIdRef.current++,
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: sizeRange.min + Math.random() * (sizeRange.max - sizeRange.min),
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.0,
      rotation: Math.random() * 360
    };

    setParticles(prev => [...prev, newParticle]);
    lastMousePosRef.current = { x: e.clientX, y: e.clientY, isMoving: true };
  };

  const handleMouseLeave = () => {
    lastMousePosRef.current.isMoving = false;
  };

  return (
    <div
      className="trailing-particle-cursor"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}
    >
      {/* Text Content */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <h1
          style={{
            margin: 0,
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
            fontSize: '18px',
            fontWeight: '400',
            color: textColor,
            opacity: 0.7,
            letterSpacing: '0.025em',
            lineHeight: 1.5
          }}
        >
          {description}
        </p>
      </div>

      {/* Particles */}
      {!prefersReducedMotion && particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'fixed',
            left: particle.x + 'px',
            top: particle.y + 'px',
            width: particle.size + 'px',
            height: particle.size + 'px',
            borderRadius: '50%',
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            pointerEvents: 'none',
            zIndex: 1000,
            willChange: 'transform, opacity'
          }}
        />
      ))}

      {/* Custom Cursor Dot */}
      {!prefersReducedMotion && (
        <div
          style={{
            position: 'fixed',
            left: lastMousePosRef.current.x + 'px',
            top: lastMousePosRef.current.y + 'px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: `2px solid ${textColor}`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 10000,
            opacity: 0.3
          }}
        />
      )}
    </div>
  );
}


