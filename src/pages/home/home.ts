import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import EyeTracker from "../../components/eye-tracker/eye-tracker.vue";

export default defineComponent({
  name: "Home",
  components: {
    EyeTracker,
  },
  setup() {
    console.log("Home Component Loaded...");

    const { t } = useI18n();

    const translations = computed(() => ({
      home: {
        welcome: t("home.welcome"),
        description: t("home.description"),
        subtitle: t("home.subtitle"),
      },
    }));

    return { translations };
  },
});
