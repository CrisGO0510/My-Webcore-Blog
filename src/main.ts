import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Quasar, QBtn, QIcon, QSelect, QTooltip, QInput, QToggle } from "quasar";
import quasarLang from "quasar/lang/es";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Import i18n
import i18n from "./i18n";

import "./styles/main.scss";
import App from "./app/App.vue";
import router from "./router";

const myApp = createApp(App);

// Configurar Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
myApp.use(pinia);

myApp.use(Quasar, {
  plugins: {},
  lang: quasarLang,
  components: {
    QBtn,
    QIcon,
    QSelect,
    QTooltip,
    QInput,
    QToggle,
  },
});

// Configurar Vue I18n
myApp.use(i18n);
myApp.use(router);

myApp.mount("#app");
