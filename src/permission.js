import router from "./routers";

router.beforeEach((to, from, next) => {
    HeyUI.$LoadingBar.start();
    console.log(to.name);
    console.log(from.name);
  if (to.name !== from.name) {
    next();
  }
});
router.afterEach(to => {
  HeyUI.$LoadingBar.success();
  window.scrollTo(0, 0);
});
