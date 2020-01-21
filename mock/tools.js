export default [
  {
    url: '/tools/colors',
    type: 'post',
    response: config => {
      // mock error]
      const data = require('../src/assets/json/colors.json')
      return {
        code: 200,
        data: { ...data }
      };
    }
  }
];
