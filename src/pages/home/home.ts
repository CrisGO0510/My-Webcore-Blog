import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import EyeTracker from "../../components/eye-tracker/eye-tracker.vue";
import { useSettings } from "../../composables/useSettings";

export default defineComponent({
  name: "Home",
  components: {
    EyeTracker,
  },
  setup() {
    console.log("Home Component Loaded...");
    const { animationEnable } = useSettings();

    const { t } = useI18n();

    const translations = computed(() => ({
      home: {
        welcome: t("home.welcome"),
        description: t("home.description"),
        subtitle: t("home.subtitle"),
      },
    }));

    return { translations, animationEnable };
  },
});
