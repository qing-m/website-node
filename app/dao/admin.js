const { Admin } = require('@models/admin')

class AdminDao {
  async registerAuth(res) {
    // const userAdmin = await Admin
    const jane = Admin.build({ email: res.email });
    await jane.save();
    // return userAdmin
  }
}

module.exports = {
  AdminDao
}