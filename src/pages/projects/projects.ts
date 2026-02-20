import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Header from "../../components/header/header.vue";

export default defineComponent({
  name: "Projects",
  components: {
    Header,
  },
  setup() {
    console.log("Projects Component Loaded...");

    const { t } = useI18n();

    const translations = computed(() => ({
      projects: {
        title: t("projects.title"),
        subtitle: t("projects.subtitle"),
        viewDemo: t("projects.viewDemo"),
        viewCode: t("projects.viewCode"),
      },
    }));

    // Projects data - puede venir de una API o ser estático
    const projects = [
      {
        id: 1,
        name: "Vue.js Dashboard",
        description: "Dashboard administrativo con Vue 3 y TypeScript",
        technologies: ["Vue.js", "TypeScript", "Quasar", "Pinia"],
        link: "https://example.com/vue-dashboard",
        github: "https://github.com/crisgo/vue-dashboard"
      },
      {
        id: 2,
        name: "Angular CRM",
        description: "Sistema CRM empresarial con Angular y .NET",
        technologies: ["Angular", "C#", ".NET Core", "SQL Server"],
        link: null,
        github: "https://github.com/crisgo/angular-crm"
      },
      {
        id: 3,
        name: "Cyberpunk Blog",
        description: "Este blog con temática cyberpunk y efectos visuales",
        technologies: ["Vue.js", "Three.js", "SCSS", "TypeScript"],
        link: window.location.origin,
        github: "https://github.com/crisgo/cyberpunk-blog"
      },
      {
        id: 4,
        name: "Microservices Architecture",
        description: "Arquitectura de microservicios con Docker y Kubernetes",
        technologies: ["Node.js", "Docker", "Kubernetes", "Redis"],
        link: null,
        github: "https://github.com/crisgo/microservices-arch"
      }
    ];

    return { 
      translations,
      projects 
    };
  },
});