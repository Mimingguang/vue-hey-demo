module.exports = {
  port: 2020,
  root: "dist",
  timestamp: true, //build生成的static文件夹是否添加时间戳
  clean: true, //打包之前清空dist目录
  openBrowser: true, // 自动打开浏览器
  stat: false, // 是否生成stat.json
  webpack: {
    console: false, //打包压缩是否保留console，默认为false
    sourceMap: false, //打包的时候要不要保留sourceMap, 默认为false
    publicPath: "/",
    output: {
      "./*html": {
        entry: "./src/main"
      }
    },
    //定义resolve，https://webpack.js.org/configuration/resolve/
    alias: {
      "@": "./src",
      components: "./src/components/"
      // 你可以使用 import index from 'components/index'  => src/components/index
    },
    global: {
      HeyUI: "heyui"
    },
    devServer: {},
    externals: {},
    globalVars: "./src/css/var.less"
  },
  copy: []
};
