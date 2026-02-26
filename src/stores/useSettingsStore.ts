import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface SettingsState {
  animationEnable: boolean;
  theme: "light" | "dark" | "auto";
  language: "es" | "en";
}

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const animationEnable = ref<boolean>(true);
    const theme = ref<SettingsState["theme"]>("auto");
    const language = ref<SettingsState["language"]>("es");
    const isAnimationEnabled = computed(() => animationEnable.value);

    const isDarkMode = computed(() => {
      if (theme.value === "auto") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return theme.value === "dark";
    });

    const currentSettings = computed(
      (): SettingsState => ({
        animationEnable: animationEnable.value,
        theme: theme.value,
        language: language.value,
      }),
    );

    const toggleAnimations = () => {
      animationEnable.value = !animationEnable.value;
      console.log("🎭 Animations toggled:", animationEnable.value);
    };

    const setTheme = (newTheme: SettingsState["theme"]) => {
      theme.value = newTheme;
      console.log("🎨 Theme changed to:", newTheme);
    };

    const setLanguage = (newLanguage: SettingsState["language"]) => {
      language.value = newLanguage;
      console.log("🌍 Language changed to:", newLanguage);
    };

    const resetSettings = () => {
      animationEnable.value = true;
      theme.value = "auto";
      language.value = "es";
      console.log("🔄 Settings reset to defaults");
    };

    // ==================== RETURN ====================

    return {
      // Estado (como refs para mantener reactividad)
      animationEnable,
      theme,
      language,

      // Getters
      isAnimationEnabled,
      isDarkMode,
      currentSettings,

      // Acciones
      toggleAnimations,
      setTheme,
      setLanguage,
      resetSettings,
    };
  },
  {
    // ==================== CONFIGURACIÓN DE PERSISTENCIA ====================
    persist: {
      key: "webcore-blog-settings", // Clave única en localStorage
      storage: localStorage, // Usar localStorage (por defecto)
    },
  },
);

