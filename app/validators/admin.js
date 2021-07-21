const { LinValidator, Rule } = require('@core/lin-validator')

const regExpPasswore = '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
const regExpNickName = '^[\u4e00-\u9fa5]{0,}$'

class CreateAuthNumberValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '请输入正确的邮箱')
    ],
    this.password = [
      new Rule('isLength', '密码长度为6~32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', regExpPasswore)
    ],
    this.nickName = [
      new Rule('matches', '用户名称不符合规范', regExpNickName)
    ]
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '请输入正确的邮箱')
    ]
    this.password = [
      new Rule('matches', '密码不符合规范', regExpPasswore)
    ]
  }
}

module.exports = {
  CreateAuthNumberValidator,
  LoginValidator
}