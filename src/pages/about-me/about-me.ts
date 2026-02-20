import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

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
      },
    }));

    const characterStats = [
      { label: "Nick", value: "CrisGO" },
      {
        label: "Edad",
        value: (() => {
          return calculateAge();
        })(),
      },
      { label: "HP", value: "???" },
      { label: "Mana", value: "???" },
      { label: "Rank", value: "S-Class" },
    ];

    const tools = {
      langs: [
        "Rust",
        "C",
        "TypeScript",
        "JavaScript",
        "Kotlin",
        "Python",
        "Go",
      ],
      libs: ["Vue", "Angular", "React", "Node", "Tailwind", "Three.js"],
      dbs: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
    };

    const apps = ["VS Code", "Neovim", "Docker", "Figma", "Obsidian"];
    const workspace = {
      os: "Arch Linux",
      keyboard: "Custom 60%",
      monitor: 'Ultrawide 34"',
    };

    return {
      translations,
      currentSection,
      characterStats,
      tools,
      apps,
      workspace,
    };
  },
});

