import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

import LangMenu from "./components/LangMenu.vue";
app.component("LangMenu", LangMenu);

app.mount("#app");
