const { sequelize } = require('@core/db')
const { Sequelize, DataTypes, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class Admin extends Model {
  toJSON() {
    let origin = {
      id: this.id,
    }
    return origin
  }
}

Admin.init({
  // 在这里定义模型属性
  email: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  password: {
    type: DataTypes.STRING(127),
    allowNull: false,
    set(origin) {
      const salt = bcrypt.genSaltSync(10)
      const val = bcrypt.hashSync(origin, salt)
      this.setDataValue('password', val)
    },
    get() {
      return this.getDataValue('password');
    }
  },
  nickName: {
    type: DataTypes.STRING
  },
  displayName:{
    type: DataTypes.STRING
  },
  sex: {
    type: DataTypes.ENUM('男','女'),
    defaultValue: '男'
  },
  uuId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4 // 或 Sequelize.UUIDV1
  }
},{
   // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'admin', // 我们需要选择模型名称
  freezeTableName: true, // 强制表名等于模型名称
  // tableName: 'admin' 直接提供表名
})

// Admin.sync() // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// Admin.sync({ force: true }) // 将创建表,如果表已经存在,则将其首先删除
// Admin.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

// await Admin.drop() 删除表
// await sequelize.drop(); 删除所有表

module.exports = {
  Admin
}