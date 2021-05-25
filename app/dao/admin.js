const { Admin } = require('../models/admin')

class AdminDao {
  async getUserAdmin() {
    const userAdmin = await Admin.findAll()
    console.log('getUserAdmin')
    console.log(userAdmin)
    return userAdmin
  }
}

module.exports = {
  AdminDao
}