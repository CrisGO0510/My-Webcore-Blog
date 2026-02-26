import { ref, computed } from "vue";
import { setLocale, getCurrentLocale, availableLocales } from "../i18n";
import type { SupportedLanguage, UseGlobalLanguageReturn } from "../types/components";

const currentLanguage = ref<SupportedLanguage>(getCurrentLocale());

export function useGlobalLanguage(): UseGlobalLanguageReturn {
  const languageInfo = computed(() => {
    const current = availableLocales.find(
      (lang) => lang.value === currentLanguage.value,
    );
    return current || availableLocales[0];
  });

  const changeLanguage = (newLang: SupportedLanguage): void => {
    currentLanguage.value = newLang;

    setLocale(newLang);

    localStorage.setItem("preferred-language", newLang);
  };

  const toggleLanguage = (): void => {
    const newLang: SupportedLanguage = currentLanguage.value === "es" ? "en" : "es";
    changeLanguage(newLang);
  };

  const initializeLanguage = (): void => {
    const savedLang = localStorage.getItem("preferred-language") as SupportedLanguage | null;

    if (
      savedLang &&
      availableLocales.some((lang) => lang.value === savedLang)
    ) {
      changeLanguage(savedLang);
    }
  };

  return {
    language: currentLanguage,

    languageInfo,

    availableLanguages: availableLocales,

    changeLanguage,
    toggleLanguage,
    initializeLanguage,

    isSpanish: computed(() => currentLanguage.value === "es"),
    isEnglish: computed(() => currentLanguage.value === "en"),
  };
}

export const globalLanguage = useGlobalLanguage();
