const { LinValidator, Rule } = require('@core/lin-validator')

class CreateAuthNumberValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
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
    this.nickName = new Rule('isNotEmpty', '昵称不可为空');
    this.password = new Rule('isNotEmpty', '密码不可为空');
  }
}

module.exports = {
  CreateAuthNumberValidator,
  LoginValidator
}