import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import * as THREE from 'three';
import { useSettings } from '../../composables/useSettings';

// Función para crear líneas de conexión entre capas (efecto wireframe 3D cyber)
function createHeartWireframeLines(heartScale: number = 1): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = [];
  const scale = 2.5 * heartScale; // Usar la escala dinámica
  const layers = 21;
  const pointsPerLayer = 30;
  
  // Crear líneas que conectan puntos entre capas Z para efecto cyber
  for (let layer = 0; layer < layers; layer++) {
    const z = (layer - 10) * 1.2;
    
    for (let i = 0; i < pointsPerLayer; i++) {
      const t = (i / pointsPerLayer) * Math.PI * 2;
      const t2 = ((i + 1) / pointsPerLayer) * Math.PI * 2;
      
      // Puntos del corazón en esta capa
      const x1 = scale * (16 * Math.pow(Math.sin(t), 3));
      const y1 = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const z1 = z + Math.sin(t * 2) * 1.5;
      
      const x2 = scale * (16 * Math.pow(Math.sin(t2), 3));
      const y2 = scale * (13 * Math.cos(t2) - 5 * Math.cos(2 * t2) - 2 * Math.cos(3 * t2) - Math.cos(4 * t2));
      const z2 = z + Math.sin(t2 * 2) * 1.5;
      
      // Líneas horizontales en la misma capa
      if (i % 2 === 0) {
        lines.push([
          new THREE.Vector3(x1, y1, z1),
          new THREE.Vector3(x2, y2, z2)
        ]);
      }
      
      // Líneas verticales entre capas (cada 3 capas para no saturar)
      if (layer < layers - 3 && i % 3 === 0) {
        const nextZ = ((layer + 3) - 10) * 1.2;
        const x3 = scale * (16 * Math.pow(Math.sin(t), 3));
        const y3 = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const z3 = nextZ + Math.sin(t * 2) * 1.5;
        
        lines.push([
          new THREE.Vector3(x1, y1, z1),
          new THREE.Vector3(x3, y3, z3)
        ]);
      }
    }
  }
  
  return lines;
}

// Función para crear material principal de líneas cyberpunk
function createMainLineMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8,
    linewidth: 2
  });
}

// Función para crear material secundario de glow
function createGlowLineMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0x8b2be2,
    transparent: true,
    opacity: 0.5,
    linewidth: 1
  });
}

// Función para configurar las luces
function setupLights(scene: THREE.Scene): void {
  // Luz ambiental suave
  const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
  scene.add(ambientLight);
  
  // Luz direccional para resaltar wireframe
  const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.4);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);
}

// Función para animar el corazón 3D vectorial
function animateHeart3D(heartGroup: THREE.Group, time: number, animationsEnabled: boolean, position: string): void {
  if (!animationsEnabled) return;
  
  // ROTACIÓN HORIZONTAL (eje Y) como rueda girando
  const rotationSpeed = position === 'left' ? 0.8 : -0.8; // Direcciones opuestas
  heartGroup.rotation.y = time * rotationSpeed;
  
  // Rotación suave adicional en X y Z para efecto cyberpunk sutil
  heartGroup.rotation.x = Math.sin(time * 0.2) * 0.1;
  heartGroup.rotation.z = Math.cos(time * 0.3) * 0.08;
  
  // Efecto de latido
  const scale = 1 + Math.sin(time * 2.5) * 0.12;
  heartGroup.scale.set(scale, scale, scale);
  
  // Animación de opacity para líneas pulsantes
  heartGroup.children.forEach((child, index) => {
    if (child instanceof THREE.Line) {
      const material = child.material as THREE.LineBasicMaterial;
      const baseOpacity = material.color.getHex() === 0x00ffff ? 0.8 : 0.5;
      material.opacity = baseOpacity + Math.sin(time * 4 + index * 0.1) * 0.25;
    }
  });
}

export default defineComponent({
  name: 'Heart3D',
  props: {
    position: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value)
    }
  },
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const { animationEnable } = useSettings();
    
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let heartGroup: THREE.Group;
    let animationId: number;

    const containerClasses = computed(() => [
      'heart3d-container',
      `heart3d-container--${props.position}`,
      { 'no-animations': !animationEnable.value }
    ]);

    const initThreeJS = (): void => {
      if (!canvasRef.value) return;

      // Configurar escena
      scene = new THREE.Scene();
      scene.background = null; // Completamente transparente

      // Configurar cámara con perspectiva 3D
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 0, 120);

      // Configurar renderer para ocupar todo el contenedor
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.value,
        alpha: true,
        antialias: true,
        premultipliedAlpha: false
      });
      
      // Tamaño dinámico basado en el contenedor padre
      const container = canvasRef.value.parentElement;
      const size = Math.min(container?.clientWidth || 300, container?.clientHeight || 300);
      
      renderer.setSize(size, size);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0); // Fondo completamente transparente

      // Crear grupo para el corazón 3D
      heartGroup = new THREE.Group();

      // ESCALAR EL CORAZÓN para que ocupe todo el canvas
      const heartScale = size / 200; // Factor de escala basado en el tamaño del canvas
      
      // 1. Crear el wireframe principal del corazón 3D
      const wireframeLines = createHeartWireframeLines(heartScale);
      const mainMaterial = createMainLineMaterial();
      
      wireframeLines.forEach((linePoints, index) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        const material = index % 3 === 0 ? mainMaterial.clone() : createGlowLineMaterial();
        const line = new THREE.Line(geometry, material);
        heartGroup.add(line);
      });

      // 2. Crear contornos principales para capas Z estratégicas (efecto cyber)
      const strategicLayers = [-10, -6, -2, 0, 2, 6, 10];
      
      strategicLayers.forEach((z, layerIndex) => {
        const contourPoints: THREE.Vector3[] = [];
        for (let i = 0; i <= 40; i++) {
          const t = (i / 40) * Math.PI * 2;
          const scale = 2.5 * heartScale; // ESCALAR según el tamaño del canvas
          const x = scale * (16 * Math.pow(Math.sin(t), 3));
          const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          const zVar = z + Math.sin(t * 2) * 1.5;
          contourPoints.push(new THREE.Vector3(x, y, zVar));
        }
        
        const contourGeometry = new THREE.BufferGeometry().setFromPoints(contourPoints);
        const contourMaterial = layerIndex % 2 === 0 ? createMainLineMaterial() : createGlowLineMaterial();
        const contourLine = new THREE.LineLoop(contourGeometry, contourMaterial);
        heartGroup.add(contourLine);
      });

      
      scene.add(heartGroup);
      setupLights(scene);
      animate();

      // Resize handler para mantener el tamaño dinámico
      const handleResize = () => {
        const container = canvasRef.value?.parentElement;
        if (container && renderer && heartGroup) {
          const newSize = Math.min(container.clientWidth, container.clientHeight);
          const newScale = newSize / 200;
          
          renderer.setSize(newSize, newSize);
          heartGroup.scale.set(newScale, newScale, newScale);
        }
      };

      window.addEventListener('resize', handleResize);
    };

    const animate = (): void => {
      animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      animateHeart3D(heartGroup, time, animationEnable.value, props.position);
      
      renderer.render(scene, camera);
    };

    const cleanup = (): void => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };

    onMounted(() => {
      initThreeJS();
    });

    onBeforeUnmount(() => {
      cleanup();
    });

    return {
      canvasRef,
      containerClasses
    };
  }
});