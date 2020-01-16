import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from '@/router';
import store from '../store/index';
import { install, Prototypes, Message } from 'heyui';
import { Utils } from 'hey-utils';
// import qs from 'qs';
Vue.use(VueAxios, axios);
Vue.use(install, {
  components: { Message },
  prototypes: Prototypes
});
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Message({
    text: msg,
    duration: 1000,
    type: 'error'
  });
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      Utils.removeCookie('token');
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
  },
  // 请求失败
  error => {
    console.log(error)
    const { response } = error;

    errorHandle(response.status, response.data.message);
    return Promise.reject(response);
  }
);

export default instance;
