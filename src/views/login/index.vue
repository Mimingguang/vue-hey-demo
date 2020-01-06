<template>
  <div class="login">
    <section class="login-container">
      <h2 v-margin="30" class="primary-color text-center">登录</h2>
      <Form
        ref="form"
        valid-on-change
        show-error-tip
        :label-width="110"
        :rules="validationRules"
        label-position="left"
        :model="model"
        :top="0.2"
      >
        <FormItem label="用户名" prop="name">
          <template v-slot:label><i class="h-icon-user" /> 用户名</template>
          <input v-model="model.name" type="text">
        </FormItem>
        <FormItem label="密码" icon="h-icon-complete" prop="password">
          <input v-model="model.password" type="password">
        </FormItem>
        <FormItem>
          <Button
            color="primary"
            :loading="isLoading"
            @click="submit"
          >提交</Button>&nbsp;&nbsp;&nbsp;
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
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
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
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
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
    submit() {
      this.isLoading = true
      const validResult = this.$refs.form.valid()
      if (validResult.result) {
        login({
          username: this.model.name,
          password: this.model.password
        }).then(res => {
          console.log(res)
          this.isLoading = false
          this.$router.push({ name: 'Dashboard' })
        //   Cookies.set('token',res.)
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
    box-shadow: 0 0 10px rgba(200,200,200,.5);
    width: 350px;
    margin: 0 auto;
  }
}
</style>
