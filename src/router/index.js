import Vue from 'vue';
import VueRouter from 'vue-router';
import constantRoutes from './routes';
Vue.use(VueRouter);

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const LOGIN_PAGE_NAME = 'Login'
router.beforeEach((to, from, next) => {
  HeyUI.$LoadingBar.start();
  if (!Utils.getToken() && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next(`/login?redirect=${to.path}`);
  } else if (!Utils.getToken() && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next(); // 跳转
  } else if (Utils.getToken() && to.name === LOGIN_PAGE_NAME) {
    if (from.name !== 'Dashboard') {
      // 已登录且要跳转的页面是登录页
      next({
        name: 'Dashboard' // 跳转到home页
      });
    } else {
      // 已登录且当前页面是home页
      HeyUI.$LoadingBar.success();
    }
  } else {
    next();
  }
});
router.afterEach(to => {
  HeyUI.$LoadingBar.success();
  window.scrollTo(0, 0);
});
export default router;
