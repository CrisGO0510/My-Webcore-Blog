import { defineComponent, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { PROFILE_LINKS } from "../../constants/profile-links";
import { useGlobalLanguage } from "../../composables/useGlobalLanguage";

export default defineComponent({
  name: "Header",
  setup() {
    console.log("🚀 Header Component Loaded...");

    const pfpPath = "/src/assets/fisheye-pfp.png";
    const profileLinks = PROFILE_LINKS;

    const { t } = useI18n();

    const {
      language: selectedLanguage,
      availableLanguages,
      changeLanguage: changeGlobalLanguage,
      initializeLanguage,
    } = useGlobalLanguage();

    const translations = computed(() => ({
      title: t("header.title"),
      tooltips: {
        ankh: t("header.tooltips.ankh"),
        github: t("header.tooltips.github"),
        instagram: t("header.tooltips.instagram"),
        language: t("header.tooltips.language"),
      },
    }));

    const openGitHub = () => {
      window.open(profileLinks.GITHUB.url, "_blank");
    };

    const openInstagram = () => {
      window.open(profileLinks.INSTAGRAM.url, "_blank");
    };

    const changeLanguage = (newLang: "es" | "en") => {
      changeGlobalLanguage(newLang);
    };

    onMounted(() => {
      initializeLanguage();
    });

    return {
      pfpPath,
      selectedLanguage,
      languageOptions: availableLanguages,
      translations,
      openGitHub,
      openInstagram,
      changeLanguage,
    };
  },
});
