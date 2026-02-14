import { createApp } from "vue";
import { Quasar, QBtn, QIcon, QSelect, QTooltip } from "quasar";
import quasarLang from "quasar/lang/es";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import "./styles/main.scss";
import App from "./app/App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}, 
  lang: quasarLang,
  components: {
    QBtn,
    QIcon,
    QSelect,
    QTooltip,
  },
});

myApp.mount("#app");
