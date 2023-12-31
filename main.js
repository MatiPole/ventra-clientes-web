import "./src/style.css";
import { createApp } from "vue";
import router from "./src/router/router.js";
import App from "./src/App.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");
