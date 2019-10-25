import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

Vue.config.productionTip = false

const app = {
  router,
  store,
  render: h => h(App)
};

Vue.prototype.$axios = axios;
app.store.$axios = axios;

new Vue(app).$mount("#app");