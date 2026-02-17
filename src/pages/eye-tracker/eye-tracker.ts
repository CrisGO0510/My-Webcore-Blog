import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";

export default defineComponent({
  name: "EyeTracker",
  setup() {
    console.log("Eye Component Loaded...");

    const eye = ref<HTMLElement | null>(null);

    const pupilX = ref(0);
    const pupilY = ref(0);

    const maxRadius = 12;

    const pupilStyle = computed(() => ({
      transform: `translate(${pupilX.value}px, ${pupilY.value}px)`,
    }));

    function onMouseMove(e: MouseEvent) {
      if (!eye.value) return;

      const rect = eye.value.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const angle = Math.atan2(dy, dx);

      pupilX.value = Math.cos(angle) * maxRadius;
      pupilY.value = Math.sin(angle) * maxRadius;
    }

    onMounted(() => {
      window.addEventListener("mousemove", onMouseMove);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("mousemove", onMouseMove);
    });

    // 🔑 MUY IMPORTANTE
    return {
      eye,
      pupilStyle,
    };
  },
});
