module.exports = {
  database: {
    dbName: 'koa_demo',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'AloneWangHeYao1998.',
    logging: false,
    timezone: '+08:00',
  },
  security: {
    secretKey: 'Token-Key',
    expiresIn: 60 * 60 // 过期时间
  }
}