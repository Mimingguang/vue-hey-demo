<template>
  <div class="colors warp-container">
    <div v-font="20" v-padding="10" class="colors-title">中国传统颜色<button v-tooltip class="h-btn h-btn-text" content="点击色块即可复制颜色"><i class="iconfont icon-info-circle" /></button></div>
    <Collapse v-model="value" accordion>
      <CollapseItem
        v-for="(item, i) in colorList"
        :key="i"
        :title="item.colorSystem"
      >
        <Row :space="15">
          <Cell v-for="(ite, j) in item.list" :key="j" width="12">
            <div
              :style="`background-color:${ite.color}`"
              class="colors-item"
              :class="textColor(ite)"
              @click="copyColor(ite.color)"
            >
              <p v-font="24" class="text-center">
                {{ ite.name }}
              </p>
              <p class="text-center">
                {{ ite.verse }}
              </p>
              <p class="text-right">—— {{ ite.from }}</p>
            </div>
          </Cell>
        </Row>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getColors } from '@/api/tools/colors';
export default {
  name: 'Colors',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      value: [],
      colorList: []
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: { },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
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
    init() {
      getColors().then(res => {
        this.colorList = res.data.colors;
        for (var i = 0; i < this.colorList.length; i++) {
          for (var j = 0; j < this.colorList[i].list.length; j++) {
            const rgbaObj = Utils.hexToRgba(this.colorList[i].list[j].color, 1);
            this.colorList[i].list[j].color = rgbaObj.rgba;
            this.colorList[i].list[j].red = rgbaObj.red;
            this.colorList[i].list[j].green = rgbaObj.green;
            this.colorList[i].list[j].blue = rgbaObj.blue;
          }
        }
        this.$nextTick(() => {
          this.value = [0]
        })
      });
    },

    textColor(item) {
      return ((item.red * 299 + item.green * 587 + item.blue * 114) / 1000) >= 125
        ? 'text-black'
        : 'text-white';
    },
    copyColor(color) {
      this.$Clipboard({
        text: color,
        showSuccessTip: '复制成功'
      });
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
//@import url(); 引入公共css类

.colors {
  font-family: "yan";
  .iconfont{
    cursor: pointer;
    margin-left: 10px;
  }
  &-item {
    user-select: none;
    padding: 40px 20px;
    cursor: pointer;

    &.text-white{
      color: #fff;
    }
    &.text-black{
      color: #000;
    }
  }
  .h-collapse{
    &-item{
      &-header{
        font-size: 14px;
      }
    }
  }
}
</style>
