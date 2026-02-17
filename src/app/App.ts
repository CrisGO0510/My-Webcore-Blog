import { defineComponent, onMounted, onUnmounted } from "vue";
import Header from "../components/header/header.vue";
import DvdLogo from "../components/dvd-logo/dvd-logo.vue";

// Función responsable de calcular el offset del mouse
function calculateMouseOffset(
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const x = (clientX / window.innerWidth - 0.5) * 20;
  const y = (clientY / window.innerHeight - 0.5) * 20;
  return { x, y };
}

// Función responsable de calcular efectos cyberpunk
function calculateCyberpunkEffects(
  clientX: number,
  clientY: number,
): {
  intensity: number;
  hueShift: number;
  glowRadius: number;
  scanlineDistortion: number;
} {
  const normalizedX = clientX / window.innerWidth;
  const normalizedY = clientY / window.innerHeight;

  // Intensidad basada en movimiento desde el centro
  const centerX = Math.abs(normalizedX - 0.5);
  const centerY = Math.abs(normalizedY - 0.5);
  const intensity = Math.min((centerX + centerY) * 1.5, 1);

  // Cambio de matiz basado en posición horizontal
  const hueShift = normalizedX * 60 - 30; // -30deg a +30deg

  // Radio del glow dinámico
  const glowRadius = 30 + intensity * 70; // 30px a 100px

  // Distorsión de scanlines basada en posición vertical
  const scanlineDistortion = normalizedY * 0.5; // 0 a 0.5

  return { intensity, hueShift, glowRadius, scanlineDistortion };
}

// Función responsable de aplicar todos los efectos visuales
function applyCyberpunkEffects(
  x: number,
  y: number,
  intensity: number,
  hueShift: number,
  glowRadius: number,
  scanlineDistortion: number,
): void {
  const appContainer = document.getElementById("app-container");
  if (appContainer) {
    // Efectos de posición
    appContainer.style.setProperty("--bg-x", `${x}px`);
    appContainer.style.setProperty("--bg-y", `${y}px`);

    // Efectos cyberpunk
    appContainer.style.setProperty("--glow-intensity", intensity.toString());
    appContainer.style.setProperty("--hue-shift", `${hueShift}deg`);
    appContainer.style.setProperty("--glow-radius", `${glowRadius}px`);
    appContainer.style.setProperty(
      "--scanline-distortion",
      scanlineDistortion.toString(),
    );
    appContainer.style.setProperty(
      "--purple-opacity",
      (0.2 + intensity * 0.3).toString(),
    );
  }
}

function createMouseMoveHandler() {
  return (event: MouseEvent) => {
    const { x, y } = calculateMouseOffset(event.clientX, event.clientY);
    const effects = calculateCyberpunkEffects(event.clientX, event.clientY);

    applyCyberpunkEffects(
      x,
      y,
      effects.intensity,
      effects.hueShift,
      effects.glowRadius,
      effects.scanlineDistortion,
    );
  };
}

function setupMouseTracking(): () => void {
  const handler = createMouseMoveHandler();
  document.addEventListener("mousemove", handler);

  return () => document.removeEventListener("mousemove", handler);
}

export default defineComponent({
  name: "App",
  components: {
    Header,
    DvdLogo,
  },
  setup() {
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      cleanup = setupMouseTracking();
    });

    onUnmounted(() => {
      cleanup?.();
    });

    return {};
  },
});
