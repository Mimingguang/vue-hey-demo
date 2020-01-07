/*
 * @Name:
 * @Date: 2019-07-02 09:45:01
 * @LastEditors  : mimingguang
 * @LastEditTime : 2020-01-07 11:14:53
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
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV);

module.exports = {
  // 补全文件路径
  publicPath:
    process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    // liveReload: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: `${process.env.VUE_APP_BASE_URL}`,
        target: `http://localhost:${port}/mock`,
        changeOrigin: true
        // 是否需要显示代理字段
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_API]: '/api'
        // }
      }
    },
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('src/components')
      }
    },
    externals: {}
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );
  },

  css: {
    extract: IS_PROD
  }
};
