/*
 * @Name:
 * @Date: 2019-07-02 09:45:01
 * @LastEditors  : mimingguang
 * @LastEditTime : 2020-01-06 17:00:20
 */
'use strict';
const path = require('path');
const defaultSettings = require('./src/settings.js');
const resolve = dir => path.join(__dirname, dir);
const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/css/var.less')]
    });
};
const name = defaultSettings.title || 'vue Admin Template'; // page title
const port = 9012; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // 补全文件路径
  publicPath:
    process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  // lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   // change xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `${process.env.VUE_APP_BASE_URL}`,
    //     // target: `http://localhost:${port}/mock`,
    //     changeOrigin: true
    //     // 是否需要显示代理字段
    //     // pathRewrite: {
    //     //   ['^' + process.env.VUE_APP_BASE_API]: '/api'
    //     // }
    //   }
    // },
    after: require('./mock/mock-server.js')
    // after: function(app, server) {
    //   // do fancy stuff
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('src/components')
      }
    },
    externals: {
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
