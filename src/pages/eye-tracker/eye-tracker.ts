import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
} from "vue";

export function useEyeTracker() {
  const eye = ref<SVGSVGElement | null>(null);

  const pupil = reactive({ x: 0, y: 0 });
  const iris = reactive({ x: 0, y: 0 });

  const MAX_PUPIL = 12;
  const MAX_IRIS = 6;
  const SMOOTH = 0.15;

  function onMouseMove(e: MouseEvent) {
    if (!eye.value) return;

    const rect = eye.value.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const angle = Math.atan2(dy, dx);

    pupil.x += (Math.cos(angle) * MAX_PUPIL - pupil.x) * SMOOTH;
    pupil.y += (Math.sin(angle) * MAX_PUPIL - pupil.y) * SMOOTH;

    iris.x += (Math.cos(angle) * MAX_IRIS - iris.x) * SMOOTH;
    iris.y += (Math.sin(angle) * MAX_IRIS - iris.y) * SMOOTH;
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
