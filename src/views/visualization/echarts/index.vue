<template>
  <div class="warp-container echart-tabs">
    <Tabs :datas="params" :title-name="$t()" :value="selected" class-name="h-tabs-card" @change="change">
      <template slot="item" slot-scope="{tab}"><span>{{ $t(tab.title) }}</span></template>
    </Tabs>
    <component :is="selected" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import VPie from './pie'
import VBar from './bar'
import VLine from './line'

export default {
// import引入的组件需要注入到对象中才能使用
  components: { VPie, VBar, VLine },
  data() {
    // 这里存放数据
    return {
      params: [
        {
          key: 'VPie',
          title: 'chart.pie'
        },
        {
          key: 'VBar',
          title: 'chart.bar'
        },
        {
          key: 'VLine',
          title: 'chart.line'
        }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {
    selected() {
      return this.$route.query && this.$route.query.type || 'VPie'
    }
  },
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
    change(data) {
      this.$router.push({
        query: {
          type: data.key
        }
      })
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.echart-tabs {
  .h-tabs {
    margin-bottom: 20px;
  }
}
</style>
