<template>
<Layout class="layout-container" :siderFixed="siderFixed" :siderCollapsed="siderCollapsed">
      <Sider theme="white" class="sider-container">
          <m-sider></m-sider>
      </Sider>
      <Layout :headerFixed="headerFixed">
        <HHeader theme="white">Header</HHeader>
        <Content>Content</Content>
        <HFooter>Footer</HFooter>
      </Layout>
    </Layout>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import MSider from './sider/index'
export default {
//import引入的组件需要注入到对象中才能使用
components: {MSider},
data() {
//这里存放数据
return {
    headerFixed:true, //是否固定头部
    siderFixed:true, //是否固定侧边栏
    siderCollapsed:false //是否收起侧边栏
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.layout-container{
    height: 100vh;
    .sider-container{
        box-shadow: 1px 1px 10px rgba(200,200,200,.5);
    }
}
</style>