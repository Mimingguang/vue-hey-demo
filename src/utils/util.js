import Cookies from 'js-cookie'
import utils from 'hey-utils';
import { forEach, hasOneOf } from '@/utils/tools'
import { i18n } from '@/assets/languages'

const rclass = /[\t\r\n\f]/g;

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
  }
});
export const getToken = () => {
  return Cookies.get('token')
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  const res = []
  forEach(list, item => {
    if (item.meta && !item.hidden) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        key: item.name,
        title: i18n.tc(item.meta.title),
        meta: item.meta,
        path: item.path
      }
      if (hasChild(item) && showThisMenuEle(item, access)) {
        if (!item.name && onlyChild(item)) {
          obj = getMenuByRouter(item.children, access)[0]
        } else {
          obj.children = getMenuByRouter(item.children, access)
        }
      }
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}
export const hasChild = item => {
  return item.children && item.children.length !== 0
}
export const onlyChild = item => {
  return item.children && item.children.length === 1
}
const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
