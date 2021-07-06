const { Admin } = require('@models/admin')

class AdminDao {
  async registerAuth() {
    const userAdmin = await Admin.findAll()
    return userAdmin
  }
}

module.exports = {
  AdminDao
}