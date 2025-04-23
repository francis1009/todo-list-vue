import "./index.css";

import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");
