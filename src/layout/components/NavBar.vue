<template>
  <div class="nav-bar">
    <section class="btn-left float-left">
      <i
        v-font="18"
        :class="leftIconClass"
        class="iconfont text-hover"
        @click="toggleClick"
      />
      <i
        v-font="18"
        class="iconfont icon-reload text-hover"
        @click="reloadClick"
      />
      <AutoComplete
        v-model="value"
        :option="params"
        type="object"
        placeholder="全局搜索..."
        @change="search"
      />
    </section>
    <section class="float-right app-header-info">
      <DropdownMenu
        class-name="app-header-dropdown"
        trigger="click"
        offset="0,5"
        :width="150"
        placement="bottom-end"
        :datas="infoMenu"
        @onclick="trigger"
      >
        <Avatar
          :src="src"
          :width="30"
        ><span>{{ userName }}</span></Avatar>
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
        <Button v-width="60" text-color="primary" @click="changeLanguage">{{
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
import routes from '@/router/routes';
export default {
  name: 'NavBar',
  inject: ['reload'], // 注入App里的reload方法
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    const ths = this;
    return {
      userName: Utils.getCookie('userName'),
      src:
        Utils.getCookie('userImg') ||
        require('@/assets/images/icon_avatar.png'),
      infoMenu: [
        { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ],
      wechatShow: false,

      value: null,
      params: {
        keyName: 'code',
        titleName: 'title',
        orgId: 1, // 自定义参数传递
        loadData: ths.loadData,
        minWord: 1
      },
      searchList: []
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
      return !this.isSun ? 'icon-yangguang' : 'icon-shuimian';
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getSearchList(routes);
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
    getSearchList(list) {
      list.forEach(item => {
        if (item.children) {
          this.getSearchList(item.children);
        } else if (!item.hidden) {
          this.searchList.push({
            code: this.searchList.length,
            title: item.meta.title.includes('.') ? this.$t(item.meta.title) : item.meta.title,
            name: item.name
          });
        }
      });
    },
    search(data, trigger) {
      this.$router.push({ name: data.value.name });
    },
    loadData(filter, callback) {
      const arr = this.searchList.filter(item => {
        return item.name.includes(filter) || item.name.includes(filter.toUpperCase()) || item.title.includes(filter) || item.title.includes(filter.toUpperCase());
      });
      callback(
        arr.map(r => {
          return r;
        })
      );
    },
    toggleClick() {
      this.$emit('toggleClick');
    },
    reloadClick() {
      this.reload();
    },
    trigger(data) {
      if (data === 'logout') {
        Utils.removeCookie('token');
        this.$router.replace({
          name: 'Login',
          query: {
            redirect: this.$route.fullPath
          }
        });
      } else {
        this.$router.push({ name: 'AccountBasic' });
      }
    },
    changeLanguage() {
      this.$store.dispatch(
        'app/toggleLanguages',
        this.$i18n.locale === 'en' ? 'zh' : 'en'
      );
      this.$i18n.locale = this.$store.getters.languages;
      this.searchList = [];
      this.getSearchList(routes);
    },
    goGitHub() {
      window.open(
        'https://github.com/Mimingguang/vue-hey-demo/issues',
        '_blank'
      );
    },
    changeTheme() {
      // color 传入颜色值
      this.$store.dispatch('app/toggleIsSun', !this.isSun);
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
//@import url(); 引入公共css类
.nav-bar {
  .btn-left {
    display: flex;
    margin-left: 20px;

    i {
      cursor: pointer;
      padding: 0 10px;
      display: inline-block;
      transform: rotate(0deg);
      transition: all 0.3s ease-in-out 0.1s;
      &:hover {
        transform: rotate(180deg);
      }
    }
    .h-autocomplete {
      margin-top: 17px;
      margin-left: 10px;
      .h-autocomplete-show {
        background-color: transparent;
        border-width: 0 0 1px 0;
        border-radius: 0;
        .h-input {
          background-color: transparent;
          border: none;
          border-radius: 0;
          color: @primary-color;
          width: 80px;
          transition: width 0.2s ease-in-out 0.1s;
        }
        i{
          right: 0;
        }
        &:hover{
          .h-input {
            width: 200px;
          }
        }
        &.focusing {
          box-shadow: none;
          .h-input {
            width: 200px;
          }
        }
      }
    }
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
