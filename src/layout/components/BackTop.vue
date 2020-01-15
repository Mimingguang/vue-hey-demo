<template>
  <BackTop :target="getTarget" :bottom="70" :right="50" class-name="h-backtop-custom">
    <i class="iconfont icon-rocket-fill" />
  </BackTop>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {

    };
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
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {

    getTarget() {
      return document.querySelector('.app-warp');
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类
.h-backtop-custom{
    user-select: none;
  .h-backtop-inner {
    background-color: @primary-color;

    border-radius: 2px;
    color: @white-color;
    padding: 5px 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    transition: all @transition-time ease-in-out;
    opacity: .5;
    &:hover {
        opacity: 1;
    //   background-color: lighten(@primary-color, 10%);
    }
  }
}
</style>
