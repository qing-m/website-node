const { Admin } = require('@models/admin')
const { Forbidden } = require('@exception')

class AdminDao {
  async registerAuth(v) {
    const { email, password } = v.get('body')
    const user = await Admin.findOne({
      where: {email: email}
    })
    if(user) {
      throw new Forbidden('该用户已注册')
    }
    await Admin.create({
      email: email,
      password: password
    })
  }
}

module.exports = {
  AdminDao
}