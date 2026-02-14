import { defineComponent, ref } from "vue";
import { LANGUAGE_OPTIONS, PROFILE_LINKS } from "../../constants/profile-links";

export default defineComponent({
  name: "Header",
  setup() {
    console.log("Header Component Loaded...");
    const pfpPath = "/src/assets/fisheye-pfp.png";

    // LANGUAGE SELECTOR
    const selectedLanguage = ref("es");
    const languageOptions = LANGUAGE_OPTIONS;
    const profileLinks = PROFILE_LINKS;

    const openGitHub = () => {
      window.open(profileLinks.GITHUB.url, "_blank");
    };

    const openInstagram = () => {
      window.open(profileLinks.INSTAGRAM.url, "_blank");
    };

    const changeLanguage = (newLang: string) => {
      console.log("Language changed to:", newLang);
      selectedLanguage.value = newLang;
      // Aquí implementarías el cambio de idioma
      // Ejemplo: i18n.global.locale = newLang;
    };

    return {
      pfpPath,
      selectedLanguage,
      languageOptions,
      openGitHub,
      openInstagram,
      changeLanguage,
    };
  },
});
