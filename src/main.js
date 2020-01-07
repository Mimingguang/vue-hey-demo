import Vue from 'vue'
import App from './App'
import HeyUI from 'heyui'
import store from './store'
import { i18n } from './assets/languages/index'
import './assets/css/index.less'
import './assets/css/dark.less'
import './assets/icons/iconfont.css'

import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === "production") {
mockXHR()
// }

// init i18n with heyui
Vue.use(HeyUI, { i18n })
import router from './routers'
import './permission'

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
