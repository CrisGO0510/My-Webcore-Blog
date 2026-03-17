import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
} from "vue";

// Tipos específicos para el eye tracker
interface PupilPosition {
  x: number
  y: number
}

interface IrisPosition {
  x: number
  y: number
}

interface EyeTrackerConstants {
  MAX_PUPIL: number
  MAX_IRIS: number
  SMOOTH: number
}

export function useEyeTracker() {
  const eye = ref<SVGSVGElement | null>(null);

  const pupil = reactive<PupilPosition>({ x: 0, y: 0 });
  const iris = reactive<IrisPosition>({ x: 0, y: 0 });

  // Estado para mobile: guardar la última posición de toque
  const lastTouchPosition = reactive({ x: 0, y: 0 });
  const isMobile = ref(false);

  const constants: EyeTrackerConstants = {
    MAX_PUPIL: 12,
    MAX_IRIS: 6,
    SMOOTH: 0.15,
  };

  // Detectar si es mobile
  function checkIfMobile() {
    isMobile.value = window.innerWidth <= 768 || 'ontouchstart' in window;
  }

  function updateEyePosition(clientX: number, clientY: number) {
    if (!eye.value) return;

    const rect = eye.value.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = clientX - cx;
    const dy = clientY - cy;

    const angle = Math.atan2(dy, dx);

    if (isMobile.value) {
      // En mobile: movimiento inmediato sin suavizado
      pupil.x = Math.cos(angle) * constants.MAX_PUPIL;
      pupil.y = Math.sin(angle) * constants.MAX_PUPIL;
      
      iris.x = Math.cos(angle) * constants.MAX_IRIS;
      iris.y = Math.sin(angle) * constants.MAX_IRIS;
    } else {
      // En desktop: movimiento suave con mousemove
      pupil.x += (Math.cos(angle) * constants.MAX_PUPIL - pupil.x) * constants.SMOOTH;
      pupil.y += (Math.sin(angle) * constants.MAX_PUPIL - pupil.y) * constants.SMOOTH;

      iris.x += (Math.cos(angle) * constants.MAX_IRIS - iris.x) * constants.SMOOTH;
      iris.y += (Math.sin(angle) * constants.MAX_IRIS - iris.y) * constants.SMOOTH;
    }
  }

  function onMouseMove(e: MouseEvent) {
    if (isMobile.value) return; // No procesar mouse en mobile
    updateEyePosition(e.clientX, e.clientY);
  }

  function onTouchStart(e: TouchEvent) {
    if (!isMobile.value || e.touches.length === 0) return; // Solo procesar touch en mobile
    
    // Obtener la primera touch point
    const touch = e.touches[0];
    if (!touch) return;
    
    lastTouchPosition.x = touch.clientX;
    lastTouchPosition.y = touch.clientY;
    
    updateEyePosition(touch.clientX, touch.clientY);
  }

  function onTouchMove(e: TouchEvent) {
    if (!isMobile.value || e.touches.length === 0) return;
    
    // Prevenir scroll mientras se arrastra
    e.preventDefault();
    
    const touch = e.touches[0];
    if (!touch) return;
    
    lastTouchPosition.x = touch.clientX;
    lastTouchPosition.y = touch.clientY;
    
    updateEyePosition(touch.clientX, touch.clientY);
  }

  function onTouchEnd() {
    if (!isMobile.value) return;
    
    // Mantener la posición en la última ubicación táctil
    // El ojo se queda mirando donde el usuario tocó por última vez
  }

  function onResize() {
    checkIfMobile();
  }

  onMounted(() => {
    checkIfMobile();
    
    // Eventos de mouse para desktop
    window.addEventListener("mousemove", onMouseMove);
    
    // Eventos táctiles para mobile  
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    
    // Detectar cambios de orientación/tamaño
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);  
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("resize", onResize);
  });

  const pupilTransform = computed(() => `translate(${pupil.x} ${pupil.y})`);

  const irisTransform = computed(() => `translate(${iris.x} ${iris.y})`);

  return {
    eye,
    pupilTransform,
    irisTransform,
  };
}

export default defineComponent({
  name: "EyeTracker",
  setup() {
    return useEyeTracker();
  },
});
