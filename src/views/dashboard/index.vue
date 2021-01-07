<template>
  <div class="dashboard">
    <Row :space="20">
      <Cell width="14">
        <mg-panel :loading="loading" :title="$t('chart.bar')">
          <div slot="body">
            <div id="bar" class="chart" />
          </div>
        </mg-panel>
      </Cell>
      <Cell width="10">
        <mg-panel :loading="loading" :title="$t('chart.radar')">
          <div slot="body">
            <div id="radar" class="chart" />
          </div>
        </mg-panel>
      </Cell>
      <Cell width="24">
        <mg-panel :loading="loading" :title="$t('chart.line')">
          <div slot="body">
            <div id="line" class="chart" />
          </div>
        </mg-panel>
      </Cell>
    </Row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import MgPanel from 'components/MgPanel'
import { Bar, Radar, Line } from '@antv/g2plot'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { MgPanel },
  data() {
    // 这里存放数据
    return {
      loading: true,
      BarPlot: null,
      RadarPlot: null,
      LinePlot: null
    }
  },
  // 监听属性 类似于data概念
  computed: {
    languages() {
      return this.$store.getters.languages
    }
  },
  // 监控data中的数据变化
  watch: {
    languages(val) {
      this.init()
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
      const arr = ['BarPlot', 'RadarPlot', 'LinePlot']
      arr.forEach(item => {
        this[`get${item}`](this[item])
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    getBarPlot(flag) {
      const data = [
        { year: `1951 ${this.$t('common.year')}`, sales: 38 },
        { year: `1952 ${this.$t('common.year')}`, sales: 52 },
        { year: `1956 ${this.$t('common.year')}`, sales: 61 },
        { year: `1957 ${this.$t('common.year')}`, sales: 145 },
        { year: `1958 ${this.$t('common.year')}`, sales: 48 }
      ]

      if (flag) {
        this.BarPlot.changeData(data)
      } else {
        this.BarPlot = new Bar('bar', {
          data,
          xField: 'sales',
          yField: 'year',
          colorField: 'year'
        })

        this.BarPlot.render()
      }
    },
    getRadarPlot(flag) {
      const data = [
        {
          item: 'Design',
          user: 'a',
          score: 70
        },
        {
          item: 'Design',
          user: 'b',
          score: 30
        },
        {
          item: 'Development',
          user: 'a',
          score: 60
        },
        {
          item: 'Development',
          user: 'b',
          score: 70
        },
        {
          item: 'Marketing',
          user: 'a',
          score: 60
        },
        {
          item: 'Marketing',
          user: 'b',
          score: 50
        },
        {
          item: 'Users',
          user: 'a',
          score: 40
        },
        {
          item: 'Users',
          user: 'b',
          score: 50
        },
        {
          item: 'Test',
          user: 'a',
          score: 60
        },
        {
          item: 'Test',
          user: 'b',
          score: 70
        },
        {
          item: 'Language',
          user: 'a',
          score: 70
        },
        {
          item: 'Language',
          user: 'b',
          score: 50
        },
        {
          item: 'Technology',
          user: 'a',
          score: 50
        },
        {
          item: 'Technology',
          user: 'b',
          score: 40
        },
        {
          item: 'Support',
          user: 'a',
          score: 30
        },
        {
          item: 'Support',
          user: 'b',
          score: 40
        },
        {
          item: 'Sales',
          user: 'a',
          score: 60
        },
        {
          item: 'Sales',
          user: 'b',
          score: 40
        },
        {
          item: 'UX',
          user: 'a',
          score: 50
        },
        {
          item: 'UX',
          user: 'b',
          score: 60
        }
      ]

      if (flag) {
        this.RadarPlot.changeData(data)
      } else {
        this.RadarPlot = new Radar(document.getElementById('radar'), {
          data,
          angleField: 'item',
          radiusField: 'score',
          seriesField: 'user',
          line: {
            visible: true
          }
        })

        this.RadarPlot.render()
      }
    },
    getLinePlot(flag) {
      const data = [
        {
          date: '2018/8/1',
          type: 'download',
          value: 4623
        },
        {
          date: '2018/8/1',
          type: 'register',
          value: 2208
        },
        {
          date: '2018/8/1',
          type: 'bill',
          value: 182
        },
        {
          date: '2018/8/2',
          type: 'download',
          value: 6145
        },
        {
          date: '2018/8/2',
          type: 'register',
          value: 2016
        },
        {
          date: '2018/8/2',
          type: 'bill',
          value: 257
        },
        {
          date: '2018/8/3',
          type: 'download',
          value: 508
        },
        {
          date: '2018/8/3',
          type: 'register',
          value: 2916
        },
        {
          date: '2018/8/3',
          type: 'bill',
          value: 289
        },
        {
          date: '2018/8/4',
          type: 'download',
          value: 6268
        },
        {
          date: '2018/8/4',
          type: 'register',
          value: 4512
        },
        {
          date: '2018/8/4',
          type: 'bill',
          value: 428
        },
        {
          date: '2018/8/5',
          type: 'download',
          value: 6411
        },
        {
          date: '2018/8/5',
          type: 'register',
          value: 8281
        },
        {
          date: '2018/8/5',
          type: 'bill',
          value: 619
        },
        {
          date: '2018/8/6',
          type: 'download',
          value: 1890
        },
        {
          date: '2018/8/6',
          type: 'register',
          value: 2008
        },
        {
          date: '2018/8/6',
          type: 'bill',
          value: 87
        },
        {
          date: '2018/8/7',
          type: 'download',
          value: 4251
        },
        {
          date: '2018/8/7',
          type: 'register',
          value: 1963
        },
        {
          date: '2018/8/7',
          type: 'bill',
          value: 706
        },
        {
          date: '2018/8/8',
          type: 'download',
          value: 2978
        },
        {
          date: '2018/8/8',
          type: 'register',
          value: 2367
        },
        {
          date: '2018/8/8',
          type: 'bill',
          value: 387
        },
        {
          date: '2018/8/9',
          type: 'download',
          value: 3880
        },
        {
          date: '2018/8/9',
          type: 'register',
          value: 2956
        },
        {
          date: '2018/8/9',
          type: 'bill',
          value: 488
        },
        {
          date: '2018/8/10',
          type: 'download',
          value: 3606
        },
        {
          date: '2018/8/10',
          type: 'register',
          value: 678
        },
        {
          date: '2018/8/10',
          type: 'bill',
          value: 507
        },
        {
          date: '2018/8/11',
          type: 'download',
          value: 4311
        },
        {
          date: '2018/8/11',
          type: 'register',
          value: 3188
        },
        {
          date: '2018/8/11',
          type: 'bill',
          value: 548
        },
        {
          date: '2018/8/12',
          type: 'download',
          value: 4116
        },
        {
          date: '2018/8/12',
          type: 'register',
          value: 3491
        },
        {
          date: '2018/8/12',
          type: 'bill',
          value: 456
        },
        {
          date: '2018/8/13',
          type: 'download',
          value: 6419
        },
        {
          date: '2018/8/13',
          type: 'register',
          value: 2852
        },
        {
          date: '2018/8/13',
          type: 'bill',
          value: 689
        },
        {
          date: '2018/8/14',
          type: 'download',
          value: 1643
        },
        {
          date: '2018/8/14',
          type: 'register',
          value: 4788
        },
        {
          date: '2018/8/14',
          type: 'bill',
          value: 280
        },
        {
          date: '2018/8/15',
          type: 'download',
          value: 445
        },
        {
          date: '2018/8/15',
          type: 'register',
          value: 4319
        },
        {
          date: '2018/8/15',
          type: 'bill',
          value: 176
        }
      ]

      if (flag) {
        this.LinePlot.changeData(data)
      } else {
        this.LinePlot = new Line(document.getElementById('line'), {
          padding: 'auto',
          forceFit: true,
          data,
          xField: 'date',
          yField: 'value',
          yAxis: {
            label: {
              // 数值格式化为千分位
              formatter: v =>
                `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`)
            }
          },
          legend: {
            position: 'right-top'
          },
          seriesField: 'type',
          responsive: true
        })

        this.LinePlot.render()
      }
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.dashboard {
}
</style>
