<!--
 * @Name: 封装echarts
 * @Date: 2020-01-15 13:52:10
 * @LastEditors  : mimingguang
 * @LastEditTime : 2020-01-16 15:20:09
 -->
<template>
  <div>
    <div v-show="isOptionAbnormal&&!isLoading" class="shadow">{{ $t('common.noData') }}</div>
    <div class="oc_echarts_container">
      <div
        :id="randomId"
        class="echarts"
        :style="{ visibility: isChartVisible ? 'visible' : 'hidden' }"
      />
    </div>
    <Loading :text="$t('common.loading')" :loading="isLoading" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import echarts from 'echarts'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Ecolors from './chartsColors'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    options: {
      type: Object,
      default: () => {
      }
    },
    isLoading: {
      type: Boolean,
      default: () => {
      }
    }
  },
  data() {
    // 这里存放数据
    return {
      myEcharts: null,
      isOptionAbnormal: false,
      randomId: 'echarts-dom' + Date.now() + Math.random(),
      scrollEvent: _.throttle(this.checkPosition, 500), // 滑动事件
      isPositionReady: false // 控制数据异步与页面滚动先后顺序的flag
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['sidebar']),
    isChartVisible() {
      return !this.isLoading && !this.isOptionAbnormal
    }
  },
  // 监控data中的数据变化
  watch: {
    options(options) {
      this.checkAndSetOption()
    },
    'sidebar.opened'() {
      setTimeout(() => {
        this.myEcharts.resize()
      }, 500)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const $echartsDOM = document.getElementById(this.randomId)
    if (!$echartsDOM) return
    this.myEcharts = echarts.init($echartsDOM)
    // 第一次未滑动的时候
    this.checkPosition()
    // 滑动之后的监听
    window.addEventListener('scroll', this.scrollEvent)
    window.addEventListener(
      'resize',
      _.throttle(() => {
        this.myEcharts.resize()
      }, 500)
    )
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
    checkAndSetOption() {
      if (!this.isPositionReady) return
      const options = { ...this.options, color: Ecolors.color }
      if (Utils.isValidOption(options)) {
        this.myEcharts.setOption(options)
        this.isOptionAbnormal = false
      } else {
        this.isOptionAbnormal = true
      }
    },
    checkPosition() {
      const windowHeight =
        document.documentElement.clientHeight || window.innerHeight
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const windowBottom = scrollTop + windowHeight
      const selfTop = _.get(this.$refs, 'selfEcharts.offsetTop', 0)
      if (windowBottom >= selfTop) {
        /**
         * @description:
         * @param {type}
         * @return:
         */
        this.isPositionReady = true
        this.checkAndSetOption()
        window.removeEventListener('scroll', this.scrollEvent)
      }
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.oc_echarts_container,
.echarts {
  width: 100%;
  height: 100%;
}

.shadow {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #8590a6;
}
</style>
