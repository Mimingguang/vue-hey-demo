<template>
  <div class="error-container" @click="globalClick">
    <Form class="four-oh-four-form">
      <FormItem>
        <input ref="404-input" v-model="input" v-focus class="404-input" type="text" @keyup.enter="submit">
      </FormItem>
    </Form>

    <div ref="terminal" class="terminal">
      <p v-for="(item,i) in promptList" :key="i" class="prompt" :class="[{'output':i!==0},{'new-output':i===promptList.length-1}]">{{ i===promptList.length-1?input:item }}</p>
    </div>
  </div>
</template>
<script>
import routes from '@/router/routes'
export default {
  name: 'Error',
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      input: '',
      promptList: [
        '404 ERROR: The page you requested cannot be found right meow. Try typing \'Dashboard\'.',
        ''
      ]
    }
  },
  mounted() {
  },
  methods: {
    globalClick() {
      this.$refs['404-input'].focus()
    },
    submit() {
      this.resetForm()
    },
    resetForm() {
      let message = ''
      this.promptList[this.promptList.length - 1] = this.input
      console.log(routes)
      console.log(this.input)
      console.log([...routes.map(item => item.name), 'Dashboard'])
      if (this.isChinese(this.input)) {
        message = 'Sorry that command is not recognized.'
      } else if (![...routes.map(item => item.name), 'Dashboard'].includes(this.input)) {
        message = '404 ERROR: The page you requested cannot be found right meow.please enter again.'
      } else {
        message = 'Redirecting, please wait...'
        console.log(this.input)
        setTimeout(() => {
          this.$router.push({ name: this.input })
        }
        , 200)
      }
      this.promptList.push(message)
      this.promptList.push('')
      this.input = ''
      // $('.').removeClass('new-output')
      // this.input = ''
      // $('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>')
      //
      // $('.new-output').velocity(
      //   'scroll'
      // ), { duration: 100 }
    },
    isChinese(temp) {
      const reg = /[^\u4e00-\u9fa5]/
      return !reg.test(temp)
    }
  }
}
</script>

<style lang="less" scoped>

@green: #1ff042;

@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.error {
  &-container {
    background-color: black;
    height: 100vh;
  }
}

.four-oh-four {
  position: relative;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 2;
  background-color: black;
  transition: opacity 300ms ease-out;
  background-position: center center;
  background-repeat: no-repeat;

  .dJAX_internal {
    opacity: 0.0;
  }

  form, input {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: black;
  }
}

.terminal {
  position: relative;
  padding: 4rem;

  .prompt {
    color: @green;
    display: block;
    font-family: 'AndaleMono', monospace;
    font-weight: bold;
    //text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 0.15em;
    white-space: pre-wrap;
    text-shadow: 0 0 2px rgba(@green, 0.75);
    line-height: 1;
    margin-bottom: 0.75em;

    &:before {
      content: '> ';
      display: inline-block;
    }
  }

  .new-output {
    display: inline-block;

    &:after {
      display: inline-block;
      vertical-align: -0.15em;
      width: 0.75em;
      height: 1em;
      margin-left: 5px;
      background: @green;
      box-shadow: 1px 1px 1px rgba(@green, 0.65), -1px -1px 1px rgba(@green, 0.65), 1px -1px 1px rgba(@green, 0.65), -1px 1px 1px rgba(@green, 0.65);
      animation: cursor-blink 1.25s steps(1) infinite;
      content: '';
    }
  }
}

.kittens {
  p {
    letter-spacing: 0;
    opacity: 0;
    line-height: 1rem;
  }
}

.kitten-gif {
  margin: 20px;
  max-width: 300px;
}

.four-oh-four-form {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
