const findMembers = function (instance, { prefix, specifiedType, filter }) {
  // 递归函数
  function _find (instance) {
    // 基线条件（跳出递归）
    if (instance.__proto__ === null) {
      return []
    }
    // 返回一个包含所有自身属性（不包含继承属性）的数组。类似于 Object.keys()
    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })
    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep (value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix) {
      // startsWith() 方法用于检测字符串是否以指定的子字符串开始。
      // 如果是以指定的子字符串开头返回 true，否则 false。
      // startsWith() 方法对大小写敏感。
      if (value.startsWith(prefix)) { return true }
    }
    if (specifiedType) {
      if (instance[value] instanceof specifiedType) { return true }
    }
  }

  return _find(instance)
}

module.exports = {
  findMembers
}
