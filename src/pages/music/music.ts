import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import Header from "../../components/header/header.vue";
import spotifyData from "../../data/spotify.json";
import type { SpotifyData, SpotifyPlaylist } from "../../types/spotify";

export default defineComponent({
  name: "Music",
  components: {
    Header,
  },
  setup() {
    const { t } = useI18n();

    const data = spotifyData as SpotifyData;
    const playlists = data.playlists;
    const selectedPlaylist = ref<SpotifyPlaylist | null>(
      playlists.length > 0 ? playlists[0] ?? null : null
    );

    const translations = computed(() => ({
      music: {
        title: t("music.title"),
        subtitle: t("music.subtitle"),
        myPlaylists: t("music.myPlaylists"),
        tracks: t("music.tracks"),
        selectPlaylist: t("music.selectPlaylist"),
        openInSpotify: t("music.openInSpotify"),
        emptyPlaylist: t("music.emptyPlaylist"),
        noPlaylists: t("music.noPlaylists"),
      },
    }));

    const selectPlaylist = (playlist: SpotifyPlaylist) => {
      selectedPlaylist.value = playlist;
    };

    return {
      translations,
      playlists,
      selectedPlaylist,
      selectPlaylist,
    };
  },
});
