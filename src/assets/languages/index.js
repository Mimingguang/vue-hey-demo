import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from 'heyui/dist/locale/en-US';
import zh from 'heyui/dist/locale/zh-CN';
import store from '@/store';

Vue.use(VueI18n);
const messages = {
  en: Object.assign(require('./en.json'), en),
  zh: Object.assign(require('./zh.json'), zh)
};
export const i18n = new VueI18n({
  locale: store.getters.languages, // set locale
  fallbackLocale: 'zh',
  messages // set locale messages
});
