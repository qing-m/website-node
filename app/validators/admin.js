const { LinValidator, Rule } = require('@core/lin-validator')

class CreateAuthNumberValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '请输入正确的Email')
    ],
    this.password = [
      new Rule('isLength', '密码长度为6~32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super()
    this.nickName = [
      new Rule('isLength', '账户不可为空', {min: 1})
    ]
    this.password = [
      new Rule('isLength', '密码不可为空', {min: 1})
    ]
  }
}

class GetUserInfo extends LinValidator {
  constructor() {
    super()
    this.userId = [
      new Rule('isLength', '请查询参数是否正确',{min: 1})
    ]
  }
}

module.exports = {
  CreateAuthNumberValidator,
  LoginValidator,
  GetUserInfo
}