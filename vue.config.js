/*
 * @Name:
 * @Date: 2019-07-02 09:45:01
 * @LastEditors  : mimingguang
 * @LastEditTime : 2020-01-07 12:54:26
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
    process.env.NODE_ENV === 'development'
      ? './'
      : process.env.VUE_APP_BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    port: port,
    open: false,
    liveReload: true,
    hot: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `${process.env.VUE_APP_BASE_URL}`,
        // target: `http://localhost:${port}/mock`,
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
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    );
    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          heyUI: {
            name: 'chunk-heyUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?hey-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
    });
  },

  css: {
    extract: IS_PROD,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
