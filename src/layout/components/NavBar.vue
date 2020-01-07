<template>
  <div class="nav-bar">
    <i
      v-font="18"
      :class="leftIconClass"
      class="iconfont inline-collapsed text-hover"
      @click="toggleClick"
    />
    <i v-font="18" class="iconfont icon-reload" />
    <section class="float-right app-header-info">
      <DropdownMenu
        class-name="app-header-dropdown float-right"
        trigger="click"
        offset="0,5"
        :width="150"
        placement="bottom-end"
        :datas="infoMenu"
        @onclick="trigger"
      >
        <Avatar :src="src" :width="30"><span>xxxxx</span></Avatar>
      </DropdownMenu>
      <ButtonGroup size="s" class="btns">
        <Button
          text-color="primary"
          icon="iconfont icon-github-fill"
          @click="goGitHub"
        />
        <Button
          text-color="primary"
          icon="iconfont icon-wechat-fill"
          @click="wechatShow = true"
        />
        <Button text-color="primary" @click="changeLanguage">{{
          $t("header.zhoren")
        }}</Button>
        <Button
          text-color="primary"
          :icon="'iconfont ' + rightIconClass"
          @click="changeTheme"
        />
      </ButtonGroup>
      <Modal v-model="wechatShow" middle>
        <div slot="header">Wechat</div>
        <div>wechat</div>
        <div slot="footer" />
      </Modal>
    </section>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapGetters } from 'vuex';
import Utils from '@/utils/util'
export default {
  name: 'NavBar',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      src: require('@/assets/images/icon_avatar.png'),
      infoMenu: [
        { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ],
      wechatShow: false
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['sidebar', 'isSun']),
    leftIconClass() {
      return {
        'icon-unorderedlist': !this.sidebar.opened,
        'icon-menu': this.sidebar.opened
      };
    },
    rightIconClass() {
      return !this.isSun ? 'icon-yangguang' : 'icon-shuimian'
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {
    toggleClick() {
      this.$emit('toggleClick');
    },
    trigger(data) {
      if (data === 'logout') {
        Utils.removeLocal('token');
        this.$router.replace({ name: 'Login' });
      } else {
        this.$router.push({ name: 'AccountBasic' });
      }
    },
    changeLanguage() {
      this.$store.dispatch('app/toggleLanguages', this.$i18n.locale === 'en' ? 'zh' : 'en')
      this.$i18n.locale = this.$store.getters.languages;
    },
    goGitHub() {
      window.open('https://github.com/Mimingguang/vue-hey-demo/issues', '_blank')
    },
    changeTheme() {
      // color 传入颜色值
      this.$store.dispatch('app/toggleIsSun', !this.isSun)
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
//@import url(); 引入公共css类
.nav-bar {
  .inline-collapsed {
    padding: 10px 20px;
  }
  .app-header-info {
    margin-right: 20px;
    .app-header-dropdown {
      cursor: pointer;
      user-select: none;
      margin-right: 20px;
    }
    .btns,
    .btns i {
      font-size: 13px;
    }
  }
}
</style>
