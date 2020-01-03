import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
/* Layout */
import Layout from "@/components/layout";

export const constantRoutes = [
         {
           path: "/login",
           name: "Login",
           component: () => import("@/views/login/index"),
           hidden: true
         },
         {
           path: "/",
           component: Layout,
           redirect: "/dashboard",
           meta: {
             // access: ['home']
           },
           children: [
             {
               path: "dashboard",
               name: "Dashboard",
               component: () => import("@/views/dashboard/index"),
               meta: {
                 title: "首页",
                 icon: "icon_sy",
                 affix: true
                 // access: ['home']
               }
             }
           ]
         },
         {
           path: "/test",
           name: "Test",
           component: Layout,
           meta: {
             title: "测试",
             icon: "icon_sy"
             // access: ['home']
           },
           children: [
             {
               path: "one",
               name: "TestOne",
               component: () => import("@/views/test/one"),
               meta: {
                 title: "测试1",
                 icon: "icon_sy"
                 // access: ['home']
               }
             },
             {
               path: "two",
               name: "TestTwo",
               component: () => import("@/views/test/one"),
               meta: {
                 title: "测试2",
                 icon: "icon_sy"
                 // access: ['home']
               }
             }
           ]
         }
       ];

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




export default router;
