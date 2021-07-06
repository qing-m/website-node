const { cloneDeep } = require("lodash")

class LinValidator {
  constructor() {
    this.data = {}
    this.parsed = {}
  }

  // 组装所有参数
  assembleAllParams(ctx) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      header: ctx.request.header,
      path: ctx.params,
    }
  }

  async validate(ctx, alias={}) {
    this.alias = alias
    // 获取传来的参数
    let params = this.assembleAllParams(ctx)

    // lodash实例 深克隆方法
    this.data = cloneDeep(params)
    this.parsed = cloneDeep(params)
  }
}

class Rule {
  constructor(name, msg, ...params) {
      Object.assign(this, {
          name,
          msg,
          params
      })
  }

  validate(field) {
      if (this.name == 'isOptional')
          return new RuleResult(true)
      if (!validator[this.name](field + '', ...this.params)) {
          return new RuleResult(false, this.msg || this.message || '参数错误')
      }
      return new RuleResult(true, '')
  }
}

module.exports = {
  LinValidator,
  Rule
}