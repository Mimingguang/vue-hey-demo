<template>
  <div class="app-footer">
    <center class="footer-container dark3-color">
      Copyright © 2020 Mimingguang ·
      <i class="h-icon-github" @click="goGitHub" /> ·<br>
      <span class="link" @click="jump">蒙ICP备17004068号-1</span>
    </center>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  beforeCreate() {
  }, // 生命周期 - 创建之前
  beforeMount() {
  }, // 生命周期 - 挂载之前
  beforeUpdate() {
  }, // 生命周期 - 更新之前
  updated() {
  }, // 生命周期 - 更新之后
  beforeDestroy() {
  }, // 生命周期 - 销毁之前
  destroyed() {
  }, // 生命周期 - 销毁完成
  activated() {
  },
  // 方法集合
  methods: {
    goGitHub() {
      window.open(
        'https://github.com/Mimingguang/vue-hey-demo/issues',
        '_blank'
      )
    },
    jump() {
      window.open('http://www.beian.miit.gov.cn/', '_blank')
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.app-footer {
  line-height: 30px;

  .footer-container {
    padding: 10px 0 20px;

    i {
      cursor: pointer;
    }
  }
}
</style>
