const { sequelize } = require('@core/db')
const { Sequelize, Model } = require('sequelize')

// 定义管理员模型
class Admin extends Model {

}

Admin.init({
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
},{
  sequelize,
  tableName: 'admin'
})

module.exports = {
  Admin
}