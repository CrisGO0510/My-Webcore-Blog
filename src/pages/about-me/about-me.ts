import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import techIcons from "../../data/tech-icons.json";
import appsData from "../../data/apps.json";
import workspaceData from "../../data/workspace.json";
import navigationData from "../../data/navigation.json";

function calculateAge(): string {
  const birth = new Date(2005, 4, 10);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age.toString();
}

export default defineComponent({
  name: "AboutMe",
  setup() {
    const { t } = useI18n();

    const currentSection = ref("presentation");
    const translations = computed(() => ({
      aboutMe: {
        title: t("aboutMe.title"),
        description: t("aboutMe.description"),
        tools: t("aboutMe.tools"),
        age: t("aboutMe.age"),
      },
    }));

    const characterStats = [
      { label: "Nick", value: "CrisGO" },
      {
        label: translations.value.aboutMe.age,
        value: (() => {
          return calculateAge();
        })(),
      },
      { label: "HP", value: "???" },
      { label: "Mana", value: "???" },
      { label: "Rank", value: "S-Class" },
    ];

    const tools = {
      langs: techIcons.langs,
      libs: techIcons.libs,
      dbs: techIcons.dbs,
    };

    const apps = appsData.apps;
    const workspace = workspaceData.workspace;
    const navigation = navigationData.navigation;

    return {
      translations,
      currentSection,
      characterStats,
      tools,
      apps,
      workspace,
      navigation,
    };
  },
});

