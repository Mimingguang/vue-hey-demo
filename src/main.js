import Vue from 'vue'
import App from './App'
import store from './store';
import { i18n } from './assets/languages/index'
import './assets/css/index.less'
import './assets/icons/iconfont.css'
import router from './router';
import MgEcharts from 'components/MgEcharts';

import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === "production") {
mockXHR()
// }

// init i18n with heyui
Vue.use(HeyUI, { i18n })
Vue.component('MgEcharts', MgEcharts);
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
