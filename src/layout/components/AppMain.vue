<template>
  <section class="app-main">
    <slot />
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="[]">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.app-main{
    padding: 20px 20px 0;
    min-height: ~"calc(100% - 90px)";
    // overflow: auto;
}
</style>
