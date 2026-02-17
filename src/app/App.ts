import { defineComponent, onMounted, onUnmounted } from "vue";
import Header from "../pages/header/header.vue";

function calculateMouseOffset(
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const x = (clientX / window.innerWidth - 0.5) * 20;
  const y = (clientY / window.innerHeight - 0.5) * 20;
  return { x, y };
}

function applyBackgroundTransform(x: number, y: number): void {
  const appContainer = document.getElementById("app-container");
  if (appContainer) {
    appContainer.style.setProperty("--bg-x", `${x}px`);
    appContainer.style.setProperty("--bg-y", `${y}px`);
  }
}

function createMouseMoveHandler() {
  return (event: MouseEvent) => {
    const { x, y } = calculateMouseOffset(event.clientX, event.clientY);
    applyBackgroundTransform(x, y);
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
