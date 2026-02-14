import { defineComponent } from "vue";
import Header from "../header/header.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
  },
  setup() {
    console.log("Home Component Loaded...");
    return {};
  },
});
