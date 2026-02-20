import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import Header from "../../components/header/header.vue";

export default defineComponent({
  name: "Music",
  components: {
    Header,
  },
  setup() {
    console.log("Music Component Loaded...");

    const { t } = useI18n();

    const translations = computed(() => ({
      music: {
        title: t("music.title"),
        subtitle: t("music.subtitle"),
        favoriteGenres: t("music.favoriteGenres"),
        currentlyListening: t("music.currentlyListening"),
        codingPlaylists: t("music.codingPlaylists"),
      },
    }));

    // Genres data
    const genres = [
      {
        id: 1,
        name: "Synthwave",
        description: "Música cyberpunk y retro-futurista",
        icon: "library_music"
      },
      {
        id: 2,
        name: "Electronic",
        description: "Beats electrónicos y ambient",
        icon: "album"
      },
      {
        id: 3,
        name: "Lo-Fi",
        description: "Música relajante para programar",
        icon: "headphones"
      },
      {
        id: 4,
        name: "Darksynth",
        description: "Synthwave oscuro y agresivo",
        icon: "volume_up"
      }
    ];

    // Current track state
    const currentTrack = ref({
      title: "Neon Dreams",
      artist: "Cyberpunk 2077 OST",
      isPlaying: false,
      progress: 45
    });

    // Playlists data
    const playlists = [
      {
        id: 1,
        name: "Deep Focus",
        tracks: 42,
        mood: "Concentración",
        icon: "psychology"
      },
      {
        id: 2,
        name: "Cyber Coding",
        tracks: 28,
        mood: "Energético",
        icon: "computer"
      },
      {
        id: 3,
        name: "Night Drive",
        tracks: 35,
        mood: "Nocturno",
        icon: "drive_eta"
      },
      {
        id: 4,
        name: "Matrix Vibes",
        tracks: 24,
        mood: "Épico",
        icon: "matrix"
      }
    ];

    const togglePlay = () => {
      currentTrack.value.isPlaying = !currentTrack.value.isPlaying;
    };

    const selectPlaylist = (playlist: any) => {
      console.log("Selected playlist:", playlist.name);
      // Aquí podrías integrar con Spotify API o similar
    };

    return { 
      translations,
      genres,
      currentTrack,
      playlists,
      togglePlay,
      selectPlaylist
    };
  },
});