const MANIFEST = {
  "type": "WebGL.ThreeJsParticleWave",
  "description": "Three.js particle system with animated wave patterns",
  "editorElement": {
    "selector": ".threejs-particle-wave",
    "displayName": "Three.js Particle Wave",
    "archetype": "container",
    "data": {
      "particleCount": {
        "dataType": "select",
        "displayName": "Particle Count",
        "defaultValue": "5000",
        "options": ["2000", "5000", "10000", "15000"],
        "group": "Content"
      },
      "waveAmplitude": {
        "dataType": "select",
        "displayName": "Wave Amplitude",
        "defaultValue": "50",
        "options": ["25", "50", "75", "100"],
        "group": "Animation"
      },
      "waveSpeed": {
        "dataType": "select",
        "displayName": "Wave Speed",
        "defaultValue": "0.5",
        "options": ["0.25", "0.5", "0.75", "1.0"],
        "group": "Animation"
      },
      "autoRotate": {
        "dataType": "booleanValue",
        "displayName": "Auto Rotate",
        "defaultValue": true,
        "group": "Animation"
      },
      "mouseInteraction": {
        "dataType": "booleanValue",
        "displayName": "Mouse Interaction",
        "defaultValue": true,
        "group": "Animation"
      },
      "particleColor": {
        "dataType": "color",
        "displayName": "Particle Color",
        "defaultValue": "#495057",
        "group": "Colors"
      },
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F9FA",
        "group": "Colors"
      },
      "particleSize": {
        "dataType": "select",
        "displayName": "Particle Size",
        "defaultValue": "2",
        "options": ["1", "2", "3", "4"],
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
  const containerRef = React.useRef(null);
  const sceneRef = React.useRef(null);
  const cameraRef = React.useRef(null);
  const rendererRef = React.useRef(null);
  const particlesRef = React.useRef(null);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const animationIdRef = React.useRef(null);

  const particleCount = parseInt(config?.particleCount || '5000');
  const waveAmplitude = parseInt(config?.waveAmplitude || '50');
  const waveSpeed = parseFloat(config?.waveSpeed || '0.5');
  const autoRotate = config?.autoRotate !== false;
  const mouseInteraction = config?.mouseInteraction !== false;
  const particleColor = config?.particleColor || '#495057';
  const backgroundColor = config?.backgroundColor || '#F8F9FA';
  const particleSize = parseInt(config?.particleSize || '2');

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    if (typeof THREE === 'undefined') {
      console.error('THREE.js not loaded');
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.z = 200;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(backgroundColor, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const gridSize = Math.cbrt(particleCount);
    const spacing = 10;
    let i = 0;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          if (i >= particleCount) break;
          positions[i * 3] = (x - gridSize / 2) * spacing;
          positions[i * 3 + 1] = (y - gridSize / 2) * spacing;
          positions[i * 3 + 2] = (z - gridSize / 2) * spacing;
          scales[i] = 1.0;
          i++;
        }
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Material
    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: particleSize,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    // Particles mesh
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e) => {
      if (!mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        time += waveSpeed * 0.01;

        // Update particle positions with wave effect
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const x = positions[i3];
          const z = positions[i3 + 2];
          
          // Wave calculation
          const distance = Math.sqrt(x * x + z * z);
          const wave = Math.sin(distance * 0.1 + time) * waveAmplitude;
          positions[i3 + 1] = (Math.floor(i / (gridSize * gridSize)) - gridSize / 2) * spacing + wave;
        }
        geometry.attributes.position.needsUpdate = true;

        // Auto rotation
        if (autoRotate) {
          particles.rotation.y += 0.001 * waveSpeed;
        }

        // Mouse interaction
        if (mouseInteraction) {
          camera.position.x += (mouseRef.current.x * 50 - camera.position.x) * 0.05;
          camera.position.y += (mouseRef.current.y * 50 - camera.position.y) * 0.05;
          camera.lookAt(scene.position);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [particleCount, waveAmplitude, waveSpeed, autoRotate, mouseInteraction, particleColor, backgroundColor, particleSize, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="threejs-particle-wave"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '600px',
        overflow: 'hidden',
        position: 'relative'
      }}
    />
  );
}


