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

  const constants: EyeTrackerConstants = {
    MAX_PUPIL: 12,
    MAX_IRIS: 6,
    SMOOTH: 0.15,
  };

  function onMouseMove(e: MouseEvent) {
    if (!eye.value) return;

    const rect = eye.value.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const angle = Math.atan2(dy, dx);

    pupil.x += (Math.cos(angle) * constants.MAX_PUPIL - pupil.x) * constants.SMOOTH;
    pupil.y += (Math.sin(angle) * constants.MAX_PUPIL - pupil.y) * constants.SMOOTH;

    iris.x += (Math.cos(angle) * constants.MAX_IRIS - iris.x) * constants.SMOOTH;
    iris.y += (Math.sin(angle) * constants.MAX_IRIS - iris.y) * constants.SMOOTH;
  }

  onMounted(() => {
    window.addEventListener("mousemove", onMouseMove);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMouseMove);
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
