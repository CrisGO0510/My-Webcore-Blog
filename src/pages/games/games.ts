import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import gamesData from "../../data/games.json";

interface Game {
  name: string;
  genre: string;
  image: string;
}

export default defineComponent({
  name: "Games",
  setup() {
    console.log("Games Component Loaded...");

    const { t } = useI18n();

    const translations = computed(() => ({
      games: {
        title: t("games.title"),
        subtitle: t("games.subtitle"),
        viewModes: {
          favorites: t("games.viewModes.favorites"),
          genre: t("games.viewModes.genre"),
        },
        stats: {
          totalGames: t("games.stats.totalGames"),
          topGames: t("games.stats.topGames"),
          retroGames: t("games.stats.retroGames"),
          genres: t("games.stats.genres"),
        },
      },
    }));

    // View mode control
    const viewMode = ref<"favorites" | "genre">("favorites");

    // All games from JSON (all are favorites, ordered by priority)
    const allGames = gamesData.games;

    // Split games: first 14 are top favorites, rest are retro
    const topGames = allGames.slice(0, 14);
    const retroGames = allGames.filter((game) => game.genre === "Retro");

    // Gaming stats computed from actual data
    const gamingStats = computed(() => [
      {
        id: "total",
        label: translations.value.games.stats.totalGames,
        value: allGames.length.toString(),
        icon: "videogame_asset",
      },
      {
        id: "genres",
        label: translations.value.games.stats.genres,
        value: uniqueGenres.value.length.toString(),
        icon: "category",
      },
    ]);

    // Computed properties for genre grouping
    const uniqueGenres = computed(() => {
      const genres = new Set(allGames.map((game) => game.genre));
      return Array.from(genres).sort();
    });

    const gamesByGenre = computed(() => {
      const grouped: Record<string, Game[]> = {};

      for (const game of allGames) {
        if (!grouped[game.genre]) {
          grouped[game.genre] = [];
        }
        grouped[game.genre]!.push(game);
      }

      return grouped;
    });

    // Methods
    const setViewMode = (mode: "favorites" | "genre") => {
      viewMode.value = mode;
    };

    return {
      translations,
      viewMode,
      allGames,
      topGames,
      retroGames,
      gamingStats,
      uniqueGenres,
      gamesByGenre,
      setViewMode,
    };
  },
});

