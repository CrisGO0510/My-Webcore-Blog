import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/useSettingsStore";

export function useSettings() {
  const settingsStore = useSettingsStore();

  const { animationEnable, theme, language, isDarkMode, currentSettings } =
    storeToRefs(settingsStore);

  return {
    animationEnable,
    toggleAnimations: settingsStore.toggleAnimations,
    theme,
    language,
    setTheme: settingsStore.setTheme,
    setLanguage: settingsStore.setLanguage,
    resetSettings: settingsStore.resetSettings,
    isDarkMode,
    currentSettings,
  };
}
