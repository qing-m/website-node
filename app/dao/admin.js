const { Admin } = require('../models/admin')

class AdminDao {
  async getUserAdmin() {
    const userAdmin = await Admin.findAll()
    return userAdmin
  }
}

module.exports = {
  AdminDao
}