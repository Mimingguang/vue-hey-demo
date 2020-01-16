import Mock from 'mockjs';
export default [
  // user login
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
      });
      return {
        code: 20000,
        data: { ...data }
      };
    }
  }]
