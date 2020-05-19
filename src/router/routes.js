
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
        component: resolve =>
          require(['@/views/dashboard/index'], resolve),
        meta: {
          title: 'menu.dashboard',
          icon: 'iconfont icon-dashboard-fill',
          affix: true
          // access: ['home']
        }
      }
    ]
  },
  {
    path: '/visualization',
    name: 'Visualization',
    component: Layout,
    meta: {
      title: 'menu.visualization',
      icon: 'iconfont icon-keshihua'
      // access: ['home']
    },
    children: [
      {
        path: 'echarts',
        name: 'Echarts',
        component: resolve =>
          require(['@/views/visualization/echarts'], resolve),
        meta: {
          title: 'Echarts'
          // access: ['home']
        }
      }
    ]
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Layout,
    meta: {
      title: 'menu.tools',
      icon: 'iconfont icon-gongju2'
      // access: ['home']
    },
    children: [
      {
        path: 'colors',
        name: 'Colors',
        component: resolve => require(['@/views/tools/colors'], resolve),
        meta: {
          title: 'menu.colors'
          // access: ['home']
        }
      },
      {
        path: 'animation',
        name: 'Animation',
        component: resolve => require(['@/views/tools/animation'], resolve),
        meta: {
          title: 'menu.animation'
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

export default constantRoutes;
