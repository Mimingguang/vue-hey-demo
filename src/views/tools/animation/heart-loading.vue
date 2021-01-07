<template>
  <div class="heart-loading">
    <ul>
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
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
  methods: {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.heart-loading {
  display: flex; /*弹性盒模型*/
  justify-content: center; /*主轴方向居中显示*/
  align-items: center; /*交叉轴方向居中显示*/
  height: ~"calc(100vh - 234px)";

  ul {
    height: 200px;
  }

  li {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 10px;
  }

  li:nth-child(1) {
    background-color: #f62e74;
    animation: love1 4s infinite;
  }

  li:nth-child(2) {
    background-color: #f45330;
    animation: love2 4s infinite;
    animation-delay: 0.15s;
  }

  li:nth-child(3) {
    background-color: #ffc883;
    animation: love3 4s infinite;
    animation-delay: 0.3s;
  }

  li:nth-child(4) {
    background-color: #30d268;
    animation: love4 4s infinite;
    animation-delay: 0.45s;
  }

  li:nth-child(5) {
    background-color: #006cb4;
    animation: love5 4s infinite;
    animation-delay: 0.6s;
  }

  li:nth-child(6) {
    background-color: #784697;
    animation: love4 4s infinite;
    animation-delay: 0.75s;
  }

  li:nth-child(7) {
    background-color: #ffc883;
    animation: love3 4s infinite;
    animation-delay: 0.9s;
  }

  li:nth-child(8) {
    background-color: #f45330;
    animation: love2 4s infinite;
    animation-delay: 1.05s;
  }

  li:nth-child(9) {
    background-color: #f62e74;
    animation: love1 4s infinite;
    animation-delay: 1.2s;
  }

  @keyframes love1 {
    30%,
    50% {
      height: 60px;
      transform: translateY(-30px);
    }
    75%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love2 {
    30%,
    50% {
      height: 125px;
      transform: translateY(-62.5px);
    }
    75%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love3 {
    30%,
    50% {
      height: 160px;
      transform: translateY(-75px);
    }
    75%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love4 {
    30%,
    50% {
      height: 180px;
      transform: translateY(-60px);
    }
    75%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
  @keyframes love5 {
    30%,
    50% {
      height: 190px;
      transform: translateY(-45px);
    }
    75%,
    100% {
      height: 20px;
      transform: translateY(0);
    }
  }
}
</style>
