<template>
  <div class="m-sider-container">
    <Menu
      ref="menu"
      :datas="routes"
      :active-all="activeAll"
      :class-name="`h-menu-${isSun?'white':'dark'}`"
      :inline-collapsed="sidebar.opened"
      :accordion="accordion"
      @select="triggerSelect"
      @click="triggerClick"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapGetters } from 'vuex'
import { constantRoutes } from '@/router/routes'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      accordion: true, // 是否启动手风琴模式
      activeAll: false
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['sidebar', 'isSun']),
    routes() {
      return Utils.getMenuByRouter(constantRoutes, [])
    }
  },
  // 监控data中的数据变化
  watch: {
    $route() {
      if (this.$route.name) {
        // router的name与menu的key对应
        this.select(this.$route.name)
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
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
    init() {
      this.select(this.$route.name)
    },
    select(key) {
      this.$refs.menu.select(key)
    },
    triggerClick(data) {
      if (
        this.$route.name !== data.key &&
        data.children && data.children.length === 0
      ) {
        this.$router.push({ name: data.key })
      }
    },
    triggerSelect(menu) {
      this.$Message.info(`选中${menu.title}`)
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.m-sider-container {
}
</style>
