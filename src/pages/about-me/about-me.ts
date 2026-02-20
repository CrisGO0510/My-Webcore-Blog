import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Header from "../../components/header/header.vue";

export default defineComponent({
  name: "AboutMe",
  components: {
    Header,
  },
  setup() {
    console.log("AboutMe Component Loaded...");

    const { t } = useI18n();

    const translations = computed(() => ({
      aboutMe: {
        title: t("aboutMe.title"),
        subtitle: t("aboutMe.subtitle"),
        myStory: t("aboutMe.myStory"),
        description: t("aboutMe.description"),
        skills: t("aboutMe.skills"),
      },
    }));

    // Skills array - puede venir de i18n o ser estático
    const skills = [
      "Vue.js",
      "Angular", 
      "TypeScript",
      "Node.js",
      "Architecture",
      "Mentoring",
      "Three.js",
      "Clean Code"
    ];

    return { 
      translations,
      skills 
    };
  },
});