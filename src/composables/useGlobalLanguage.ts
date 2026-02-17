import { ref, computed } from "vue";
import { setLocale, getCurrentLocale, availableLocales } from "../i18n";

const currentLanguage = ref(getCurrentLocale());

export function useGlobalLanguage() {
  const languageInfo = computed(() => {
    const current = availableLocales.find(
      (lang) => lang.value === currentLanguage.value,
    );
    return current || availableLocales[0];
  });

  const changeLanguage = (newLang: "es" | "en") => {
    currentLanguage.value = newLang;

    setLocale(newLang);

    localStorage.setItem("preferred-language", newLang);
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage.value === "es" ? "en" : "es";
    changeLanguage(newLang);
  };

  const initializeLanguage = () => {
    const savedLang = localStorage.getItem("preferred-language") as
      | "es"
      | "en"
      | null;

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
