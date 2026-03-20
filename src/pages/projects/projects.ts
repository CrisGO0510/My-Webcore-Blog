import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import Header from "../../components/header/header.vue";
import projectsData from "../../data/projects.json";

const ProjectStatus = {
  Completed: "completed",
  InProgress: "in-progress",
  Archived: "archived",
} as const;

type ProjectStatusValue = typeof ProjectStatus[keyof typeof ProjectStatus];

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  status: ProjectStatusValue;
  github: string | null;
  link: string | null;
}

const statusConfig: Record<ProjectStatusValue, { icon: string }> = {
  [ProjectStatus.Completed]: { icon: "check_circle" },
  [ProjectStatus.InProgress]: { icon: "autorenew" },
  [ProjectStatus.Archived]: { icon: "inventory_2" },
};

export default defineComponent({
  name: "Projects",
  components: {
    Header,
  },
  setup() {
    const { t } = useI18n();

    const projects = projectsData as Project[];
    const selectedProject = ref<Project | null>(
      projects.length > 0 ? projects[0] ?? null : null
    );

    const translations = computed(() => ({
      projects: {
        title: t("projects.title"),
        subtitle: t("projects.subtitle"),
        viewDemo: t("projects.viewDemo"),
        viewCode: t("projects.viewCode"),
        selectProject: t("projects.selectProject"),
        noProjects: t("projects.noProjects"),
        status: {
          [ProjectStatus.Completed]: t("projects.status.completed"),
          [ProjectStatus.InProgress]: t("projects.status.in-progress"),
          [ProjectStatus.Archived]: t("projects.status.archived"),
        },
      },
    }));

    const selectProject = (project: Project) => {
      selectedProject.value = project;
    };

    const getStatusConfig = (status: ProjectStatusValue) => statusConfig[status] ?? statusConfig[ProjectStatus.Archived];

    return {
      translations,
      projects,
      selectedProject,
      selectProject,
      getStatusConfig,
    };
  },
});
