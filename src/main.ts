import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { VueFire } from "vuefire";
import { firebaseApp } from "./firebase";

const app = createApp(App);

app.use(router);
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
  ],
});

app.mount("#app");
