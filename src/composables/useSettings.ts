import { ref } from "vue";

const animationEnable = ref(true);

export function useSettings() {
  const toggleAnimations = () => {
    animationEnable.value = !animationEnable.value;
  };

  return {
    animationEnable,
    toggleAnimations,
  };
}
