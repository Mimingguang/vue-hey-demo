import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
/* Layout */
import Layout from '@/layout';

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/views/login/index'], resolve),
    hidden: true
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: resolve => require(['@/views/error/refresh'], resolve),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      // access: ['home']
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: resolve => require(['@/views/dashboard/index'], resolve),
        meta: {
          title: 'menu.dashboard',
          icon: 'iconfont icon-dashboard',
          affix: true
          // access: ['home']
        }
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: Layout,
    meta: {
      title: 'menu.test',
      icon: 'iconfont icon-icon-test'
      // access: ['home']
    },
    children: [
      {
        path: 'one',
        name: 'TestOne',
        component: resolve => require(['@/views/test/one'], resolve),
        meta: {
          title: 'menu.test'
          // access: ['home']
        }
      },
      {
        path: 'two',
        name: 'TestTwo',
        component: resolve => require(['@/views/test/one'], resolve),
        meta: {
          title: 'menu.test'
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
