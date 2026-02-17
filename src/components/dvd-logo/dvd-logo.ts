import { ref, reactive, onMounted, onBeforeUnmount, computed, defineComponent } from "vue";
import dvdImageUrl from '../../assets/dvd-watermark.png';

export default defineComponent({
  name: "DvdLogo",
  setup() {
    const logo = ref<HTMLImageElement | null>(null);

    const pos = reactive({ x: 100, y: 100 });

    const velocity = reactive({ x: 3, y: 3 });

    let frameId = 0;

    const style = computed(() => ({
      transform: `translate(${pos.x}px, ${pos.y}px)`,
    }));

    function animate() {
      if (!logo.value) return;

      const logoWidth = logo.value.offsetWidth;
      const logoHeight = logo.value.offsetHeight;

      const maxX = window.innerWidth - logoWidth;
      const maxY = window.innerHeight - logoHeight;

      pos.x += velocity.x;
      pos.y += velocity.y;

      if (pos.x <= 0 || pos.x >= maxX) velocity.x *= -1;
      if (pos.y <= 0 || pos.y >= maxY) velocity.y *= -1;

      frameId = requestAnimationFrame(animate);
    }

    onMounted(() => {
      frameId = requestAnimationFrame(animate);
    });

    onBeforeUnmount(() => {
      cancelAnimationFrame(frameId);
    });

    return {
      logo,
      style,
      dvdImageUrl,
    };
  },
});