<template>
  <div id="app">
    <div v-if="!network">
      <h3>我没网了</h3>
      <div @click="onRefresh">刷新</div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['network'])
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
    onRefresh() {
      this.$router.replace('/refresh');
    }
  }
};
</script>
<style lang="less"></style>
