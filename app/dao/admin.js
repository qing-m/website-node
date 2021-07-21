const { Admin } = require('@models/admin')
const { Forbidden, NotFound, ParameterException } = require('@exception')

const bcrypt = require('bcryptjs')

class AdminDao {
  async registerAuth(v) {
    const { email, password, nickName } = v.get('body')
    const user = await Admin.findOne({
      where: {email: email}
    })
    if(user) {
      throw new Forbidden('该用户已注册')
    }
    await Admin.create({
      email: email,
      password: password,
      nickName: nickName
    })
  }

  async loginAuth(v) {
    const { email, password } = v.get('body')
    const user = await Admin.findOne({
      where: {email: email}
    })
    if(!user) {
      throw new NotFound('该用户不存在')
    }
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      throw new ParameterException('密码不正确')
    }
    return user
  }
}

module.exports = {
  AdminDao
}