import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  setup() {
    console.log("Header Component Loaded...");
    const pfpPath = "/src/assets/fisheye-pfp.png";

    return {
      pfpPath,
    };
  },
});
