import utils from 'hey-utils';
import { forEach, hasOneOf } from '@/utils/tools';
import { i18n } from '@/assets/languages';
const rclass = /[\t\r\n\f]/g;
console.log(JSON.stringify(utils))
export default utils.extend({}, utils, {
  getClass(elem) {
    return (elem.getAttribute && elem.getAttribute('class')) || '';
  },
  hasClass(elem, selector) {
    const className = ` ${selector} `;
    if (
      elem.nodeType === 1 &&
      ` ${this.getClass(elem)} `.replace(rclass, ' ').indexOf(className) > -1
    ) {
      return true;
    }

    return false;
  },

  /**
   * @param {Array} list 通过路由列表得到菜单列表
   * @returns {Array}
   */
  getMenuByRouter(list, access) {
    const res = [];
    forEach(list, item => {
      if (item.meta && !item.hidden) {
        let obj = {
          icon: (item.meta && item.meta.icon) || '',
          key: item.name,
          title:
            item.meta.title && item.meta.title.includes('.')
              ? i18n.tc(item.meta.title)
              : item.meta.title,
          meta: item.meta,
          path: item.path
        };
        if (this.hasChild(item) && this.showThisMenuEle(item, access)) {
          if (!item.name && this.onlyChild(item)) {
            obj = this.getMenuByRouter(item.children, access)[0];
          } else {
            obj.children = this.getMenuByRouter(item.children, access);
          }
        }
        if (this.showThisMenuEle(item, access)) res.push(obj);
      }
    });
    return res;
  },
  getToken() {
    return this.getCookie('token');
  },
  hasChild(item) {
    return item.children && item.children.length !== 0;
  },
  onlyChild(item) {
    return item.children && item.children.length === 1;
  },
  showThisMenuEle(item, access) {
    if (item.meta && item.meta.access && item.meta.access.length) {
      if (hasOneOf(item.meta.access, access)) return true;
      else return false;
    } else return true;
  },

  // 2. 是否为空对象；
  isEmptyObject(option) {
    return Object.keys(option).length === 0;
  },

  // 3.echarts options 是否包含 series 键；
  hasSeriesKey(option) {
    return !!option['series'];
  },

  // 4.echarts options series 是否为数组；
  isSeriesArray(option) {
    return Array.isArray(option['series']);
  },

  // 5.echarts options series 数组是否为空。
  isSeriesEmpty(option) {
    return option['series'].length === 0;
  },
  // echarts options是否合规
  isValidOption(option) {
    return (
      this.isObject(option) &&
      !this.isEmptyObject(option) &&
      this.hasSeriesKey(option) &&
      this.isSeriesArray(option) &&
      !this.isSeriesEmpty(option)
    );
  },
  // hex转rgba
  hexToRgba(hex, opacity) {
    var RGBA =
      'rgba(' +
      parseInt('0x' + hex.slice(1, 3)) +
      ',' +
      parseInt('0x' + hex.slice(3, 5)) +
      ',' +
      parseInt('0x' + hex.slice(5, 7)) +
      ',' +
      opacity +
      ')';
    return {
      red: parseInt('0x' + hex.slice(1, 3)),
      green: parseInt('0x' + hex.slice(3, 5)),
      blue: parseInt('0x' + hex.slice(5, 7)),
      rgba: RGBA
    };
  }
});
