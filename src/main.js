import Vue from 'vue';
import App from './App';
import './css/index.less';

Vue.use(HeyUI);

import router from "./routers";
import './permission'

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
