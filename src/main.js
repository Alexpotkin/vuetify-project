import { createApp } from "vue";
import App from "./App.vue";
import { registerPlugins } from "./plugins";
import router from "./router";

const app = createApp(App);

// Регистрируем плагины
registerPlugins(app);

// Подключаем маршрутизатор к приложению
app.use(router);

// Монтируем приложение на элемент с id="app" в DOM
app.mount("#app");
