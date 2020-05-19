<template>
  <div class="heart">
    <div class="heart-container" />
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
    return {};
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.heart{
    display: flex; /*弹性盒模型*/
  justify-content: center; /*主轴方向居中显示*/
  align-items: center; /*交叉轴方向居中显示*/
  height: ~"calc(100vh - 234px)";
  &-container{

  position: absolute;
  left: 50%;
  top: 50%;
  width: 105px;
  height: 105px;
  margin: -52.5px 0 0 -52.5px;
  animation: jump 1s infinite, sprite 1s infinite;
  &::before {
  content: "";
  display: block;
  transition: all 400ms;
  width: 15px;
  height: 15px;
  margin: -15px 0 0 -15px;
  box-shadow: 30px 15px #8e1a19, 45px 15px #ac0500, 75px 15px #f73f0c,
    90px 15px #fa5f27, 15px 30px #740100, 30px 30px #8e0500, 45px 30px #8e1918,
    60px 30px #ca1300, 75px 30px #f34f2b, 90px 30px #df351f, 105px 30px #f77c2a,
    15px 45px #4b0000, 30px 45px #690100, 45px 45px #8e0f0b, 60px 45px #bf1000,
    75px 45px #f84010, 90px 45px #f04222, 105px 45px #fa5724, 15px 60px #451312,
    30px 60px #5a0100, 45px 60px #840e0c, 60px 60px #a51d1a, 75px 60px #ed2805,
    90px 60px #d9321e, 105px 60px #f44622, 30px 75px #3b0000, 45px 75px #5d1a1b,
    60px 75px #8e1a19, 75px 75px #a80700, 90px 75px #b90a00, 45px 90px #3d0000,
    60px 90px #551415, 75px 90px #670100, 60px 105px #340000;
  animation: pulse 1.2s steps(1) infinite;
}

  }
}

/* 跳跃动作（上下移動） */
@keyframes jump {
  from,
  25%,
  75%,
  to {
    transform: translateY(0) scale(0.9);
  }

  50% {
    transform: translateY(calc(8px * -2)) scale(1);
  }
}

/* 普通状态和跳跃状态的像素画 */
@keyframes sprite {
  /* 对比 animation-timing-function: steps(n)
   * 使用百分比可以更细致的调整动画时间
   */
  from,
  24%,
  76%,
  to {
    /* 普通状态的像素画 */
  }

  25%,
  75% {
    /* 跳跃状态的像素画 */
  }
}

</style>
