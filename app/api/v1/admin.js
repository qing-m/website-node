const Router = require('koa-router')

const { AdminDao } =  require('../../dao/admin')

const router = new Router({
  prefix: '/api/v1/admin'
})

const AdminDto = new AdminDao()

router.get('/register', async (ctx) => {
  await AdminDto.getUserAdmin()
  ctx.response.status = 200
  ctx.body = '注册成功'
})

router.post('/login', async (ctx) => {
  ctx.response.status = 200
  ctx.body = '注册成功'
})

module.exports = router