<template>
  <div class="m-sider-container">
    <div class="logo">logo</div>
    <Menu
      :datas="routes"
      :activeAll="activeAll"
      :className="theme"
      :inlineCollapsed="inlineCollapsed"
      ref="menu"
      :accordion="accordion"
      @select="triggerSelect"
      @click="triggerClick"
    ></Menu>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { constantRoutes } from "@/routers";
import { getMenuByRouter } from "@/utils/util";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      theme: "h-menu-white", //h-menu-dark, h-menu-white
      accordion: true, //是否启动手风琴模式
      inlineCollapsed: false, //是否使用折叠模式
      activeAll: false
    };
  },
  //监听属性 类似于data概念
  computed: {
    routes() {
      return getMenuByRouter(constantRoutes, []);
    }
  },
  //监控data中的数据变化
  watch: {
    $route() {
      if (this.$route.name) {
        //router的name与menu的key对应
        this.select(this.$route.name);
      }
    }
  },
  //方法集合
  methods: {
    init() {
      this.select(this.$route.name);
    },
    select(key) {
      this.$refs.menu.select(key);
    },
    triggerClick(data) {
      if (this.$route.name !== data.key) {
        this.$router.push({ name: data.key });
      }
    },
    triggerSelect(menu) {
      this.$Message.info(`选中${menu.title}`);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.m-sider-container {
  .logo {
    line-height: 64px;
  }
}
</style>
