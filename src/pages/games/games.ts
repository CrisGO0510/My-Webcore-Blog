import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Header from "../../components/header/header.vue";

export default defineComponent({
  name: "Games",
  components: {
    Header,
  },
  setup() {
    console.log("Games Component Loaded...");

    const { t } = useI18n();

    const translations = computed(() => ({
      games: {
        title: t("games.title"),
        subtitle: t("games.subtitle"),
        favoriteGames: t("games.favoriteGames"),
        gamingStats: t("games.gamingStats"),
        platforms: t("games.platforms"),
      },
    }));

    // Favorite games data
    const favoriteGames = [
      {
        id: 1,
        title: "Cyberpunk 2077",
        description: "RPG futurista en Night City",
        icon: "sports_esports",
        status: "playing",
        rating: 4
      },
      {
        id: 2,
        title: "The Witcher 3",
        description: "RPG épico de fantasía medieval",
        icon: "videogame_asset",
        status: "completed",
        rating: 5
      },
      {
        id: 3,
        title: "Hades",
        description: "Roguelike de mitología griega",
        icon: "casino",
        status: "completed",
        rating: 5
      },
      {
        id: 4,
        title: "Outer Wilds",
        description: "Aventura espacial y viajes en el tiempo",
        icon: "rocket",
        status: "wishlist",
        rating: null
      },
      {
        id: 5,
        title: "Hollow Knight",
        description: "Metroidvania atmosférico",
        icon: "bug_report",
        status: "playing",
        rating: 4
      },
      {
        id: 6,
        title: "Elden Ring",
        description: "Souls-like en mundo abierto",
        icon: "shield",
        status: "paused",
        rating: 4
      }
    ];

    // Gaming stats data
    const gamingStats = [
      {
        id: 1,
        label: "Horas Jugadas",
        value: "1,337",
        type: "number",
        icon: "access_time"
      },
      {
        id: 2,
        label: "Juegos Completados",
        value: "42",
        type: "number",
        icon: "emoji_events"
      },
      {
        id: 3,
        label: "Género Favorito",
        value: "RPG",
        type: "text",
        icon: "category"
      },
      {
        id: 4,
        label: "Plataforma Principal",
        value: "PC",
        type: "text",
        icon: "computer"
      }
    ];

    // Platforms data
    const platforms = [
      {
        id: 1,
        name: "Steam",
        gamesCount: 150,
        icon: "computer"
      },
      {
        id: 2,
        name: "PlayStation",
        gamesCount: 85,
        icon: "gamepad"
      },
      {
        id: 3,
        name: "Nintendo Switch",
        gamesCount: 32,
        icon: "videogame_asset"
      },
      {
        id: 4,
        name: "Epic Games",
        gamesCount: 45,
        icon: "rocket_launch"
      }
    ];

    const getStatusText = (status: string): string => {
      const statusMap: { [key: string]: string } = {
        'playing': 'Jugando',
        'completed': 'Completado',
        'wishlist': 'Lista de Deseos',
        'paused': 'En Pausa'
      };
      return statusMap[status] || status;
    };

    return { 
      translations,
      favoriteGames,
      gamingStats,
      platforms,
      getStatusText
    };
  },
});