const { LinValidator, Rule } = require('@core/lin-validator')

class createAuthNumberValidator extends LinValidator {
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

module.exports = {
  createAuthNumberValidator
}