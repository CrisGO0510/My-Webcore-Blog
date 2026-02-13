import { defineComponent } from "vue";
import Home from "../components/home/home.vue";
import Header from "../components/header/header.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
    Header,
  },
  setup() {
    return {};
  },
});
