/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(phone) {
  return /^1[34578]\d{9}$/.test(phone)
}

export function validRealname(name) {
  return /^([\u4e00-\u9fa5]){2,10}$/.test(name)
}


export function roleName(type) {
  var name={'3':'星评员', '4':'星评管理员',  '5':'星评超级管理员', '6':'全国星评','7':'业主'}
  return name[type]
}