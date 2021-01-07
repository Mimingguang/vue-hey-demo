import Mock from 'mockjs'

export default [
  {
    url: '/chart/pie',
    type: 'post',
    response: config => {
      // mock error]
      const data = Mock.mock({
        'list|5-20': [
          {
            name: '@cname()',
            value: '@integer(0, 1000)'
          }
        ]
      })
      return {
        code: 200,
        data: { ...data }
      }
    }
  },
  {
    url: '/chart/line',
    type: 'post',
    response: config => {
      console.log(config)
      // mock error
      const data = Mock.mock({
        xList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        'list|5-10': [
          {
            name: '@cname()',
            'data|7': ['@integer(0, 1000)']
          }
        ]
      })
      return {
        code: 200,
        data: { ...data }
      }
    }
  }
]
