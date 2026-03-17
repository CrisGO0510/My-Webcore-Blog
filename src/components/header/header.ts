import { defineComponent, computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { PROFILE_LINKS } from "../../constants/profile-links";
import { useGlobalLanguage } from "../../composables/useGlobalLanguage";
import { useSettings } from "../../composables/useSettings";
import type { HeaderTranslations } from "../../types/components";

export default defineComponent({
  name: "Header",
  setup() {
    const { animationEnable } = useSettings();
    const router = useRouter();

    console.log("🚀 Header Component Loaded...");

    const pfpPath = "/src/assets/fisheye-pfp.png";
    const profileLinks = PROFILE_LINKS;

    // Estado para el hover simulado en mobile
    const isProfileActive = ref(false);
    const isMobile = ref(false);

    const { t } = useI18n();

    const {
      language: selectedLanguage,
      availableLanguages,
      changeLanguage: changeGlobalLanguage,
      initializeLanguage,
    } = useGlobalLanguage();

    const translations = computed((): HeaderTranslations => ({
      title: t("header.title"),
      tooltips: {
        ankh: t("header.tooltips.ankh"),
        github: t("header.tooltips.github"),
        instagram: t("header.tooltips.instagram"),
        language: t("header.tooltips.language"),
      },
    }));

    const goToHome = () => {
      router.push('/');
    };

    const openGitHub = () => {
      window.open(profileLinks.GITHUB.url, "_blank");
    };

    const openInstagram = () => {
      window.open(profileLinks.INSTAGRAM.url, "_blank");
    };

    const changeLanguage = (newLang: "es" | "en") => {
      changeGlobalLanguage(newLang);
    };

    // Detectar si es mobile
    const checkIfMobile = () => {
      isMobile.value = window.innerWidth <= 768 || 'ontouchstart' in window;
    };

    // Manejar click en la imagen de perfil (solo en mobile)
    const handleProfileClick = (event: Event) => {
      if (!isMobile.value) {
        // En desktop, comportamiento normal (ir a home)
        goToHome();
        return;
      }

      // En mobile, activar/desactivar el estado activo
      event.preventDefault();
      event.stopPropagation();
      isProfileActive.value = !isProfileActive.value;
    };

    // Manejar clicks fuera para desactivar (solo en mobile)
    const handleDocumentClick = (event: Event) => {
      if (!isMobile.value || !isProfileActive.value) return;

      const target = event.target as HTMLElement;
      const profileContainer = document.querySelector('.header-profile');
      
      // Si el click no es dentro del perfil, desactivar
      if (profileContainer && !profileContainer.contains(target)) {
        isProfileActive.value = false;
      }
    };

    // Manejar cambios de orientación/tamaño
    const handleResize = () => {
      checkIfMobile();
      // Si cambia a desktop, desactivar estado mobile
      if (!isMobile.value) {
        isProfileActive.value = false;
      }
    };

    onMounted(() => {
      checkIfMobile();
      initializeLanguage();
      
      // Agregar listener para clicks fuera del perfil
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('touchstart', handleDocumentClick);
      window.addEventListener('resize', handleResize);
    });

    return {
      pfpPath,
      selectedLanguage,
      languageOptions: availableLanguages,
      translations,
      goToHome,
      openGitHub,
      openInstagram,
      changeLanguage,
      animationEnable,
      // Nuevas propiedades para mobile hover
      isProfileActive,
      isMobile,
      handleProfileClick,
    };
  },
});
