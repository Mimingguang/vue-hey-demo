<template>
  <div class="login">
    <lottie
      :height="100"
      :options="defaultOptions"
      :width="100"
      @animCreated="handleAnimation"
    />
    <section class="login-container">
      <h2 v-margin="30" class="primary-color text-center">登录</h2>
      <Form
        ref="form"
        :label-width="110"
        :model="model"
        :rules="validationRules"
        :top="0.2"
        label-position="left"
        show-error-tip
        valid-on-change
      >
        <FormItem label="用户名" prop="name">
          <template #label><i class="h-icon-user" /> 用户名</template>
          <input v-model="model.name" type="text">
        </FormItem>
        <FormItem icon="h-icon-complete" label="密码" prop="password">
          <input v-model="model.password" type="password">
        </FormItem>
        <FormItem>
          <Button
            :loading="isLoading"
            color="primary"
            @click="submit"
          >提交
          </Button>&nbsp;&nbsp;&nbsp;
          <Button @click="reset">重置</Button>
        </FormItem>
      </Form>
    </section>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { login } from '@/api/user'
import lottie from 'vue-lottie'
import animationData from '@/assets/json/lottie-fly.json'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { lottie },
  data() {
    // 这里存放数据
    return {
      isLoading: false,
      model: {
        name: 'admin',
        password: '888888'
      },
      validationRules: {
        required: ['name', 'password']
      },
      redirect: undefined,
      defaultOptions: {
        renderer: 'svg', // 渲染方式，svg、canvas、html（轻量版仅svg渲染）
        loop: true, // 是否循环播放，true表示循环，false表示不循环
        autoplay: true, // 是否自动播放，true表示自动播放
        animationData: animationData // 需要引入的json动画对象
      },
      defaultAnim: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    $route: {
      handler: function(route) {
        if (route.query && route.query.redirect) {
          this.redirect = ''
          for (const key in route.query) {
            if (key === 'redirect') {
              this.redirect += `${route.query[key]}&`
            } else {
              this.redirect += `${key}=${route.query[key]}&`
            }
          }
        }
        this.redirect = this.redirect.substring(0, this.redirect.length - 1)
      },
      immediate: true
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this.defaultAnim.play()
    })
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
    handleAnimation(anim) {
      this.defaultAnim = anim
    },
    submit() {
      this.isLoading = true
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        login({
          username: this.model.name,
          password: this.model.password
        })
          .then((res) => {
            this.isLoading = false
            Utils.saveCookie('token', res.data.token)
            Utils.saveCookie('userName', res.data.userName)
            Utils.saveCookie('userImg', res.data.userImg)
            this.$router.push({ path: this.redirect || '/' })
          })
          .catch((error) => {
            this.isLoading = false
            console.error(error)
          })
      } else {
        this.isLoading = false
      }
    },
    reset() {
      this.$refs.form.resetValid()
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(200, 200, 200, 0.5);
    width: 350px;
    margin: 0 auto;
  }
}
</style>
