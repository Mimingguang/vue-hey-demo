<!--
 * @Name: 时钟  来源：http://chabudai.org/blog/?p=59
 * @Date: 2020-01-21 17:57:11
 * @LastEditors  : mimingguang
 * @LastEditTime : 2020-01-21 18:11:43
 -->

<template>
  <div class="clock">
    <div class="clock-container" />
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
    return {
      swfTitle: 'honehoneclock'
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.LoadBlogParts();
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
    /** ****************************************************************************
	入力		なし
	出力		document.writeによるHTML出力
******************************************************************************/
    LoadBlogParts() {
      var sUrl =
        'http://chabudai.sakura.ne.jp/blogparts/honehoneclock/honehone_clock_tr.swf';

      var sHtml = '';
      sHtml +=
        '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="160" height="70" id="' +
        this.swfTitle +
        '" align="middle">';
      sHtml += '<param name="allowScriptAccess" value="always" />';
      sHtml += '<param name="movie" value="' + sUrl + '" />';
      sHtml += '<param name="quality" value="high" />';
      sHtml += '<param name="bgcolor" value="#ffffff" />';
      sHtml += '<param name="wmode" value="transparent" />';
      sHtml +=
        '<embed wmode="transparent" src="' +
        sUrl +
        '" quality="high" bgcolor="#ffffff" width="160" height="70" name="' +
        this.swfTitle +
        '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
      sHtml += '</object>';
      document.querySelector('.clock-container').innerHTML = sHtml;
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.clock {
  transform: scale(0.6);

  &-container {
    width: 160px;
    height: 70px;
  }
}
</style>
