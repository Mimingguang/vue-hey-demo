import router from './routers';
import HeyUI from 'heyui';
import { getToken } from '@/utils/util';
const hasToken = getToken();
const whiteList = ['/login']; // no redirect whitelist
router.beforeEach((to, from, next) => {
  HeyUI.$LoadingBar.start();
  if (hasToken) {
    if (to.name !== from.name) {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`);
      next();
    }
  }
});
router.afterEach(to => {
  HeyUI.$LoadingBar.success();
  window.scrollTo(0, 0);
});
