const Router = require('koa-router')

const { createAuthNumberValidator } = require('@validators/admin')
const  { Auth } =  require('@middleware/auth')
const { AdminDao } =  require('@dao/admin')

const router = new Router({
  prefix: '/api/v1/admin'
})

const AdminDto = new AdminDao()

router.post('/register', new Auth().m, async (ctx) => {
  const v = await createAuthNumberValidator().validate(ctx)
  console.log(v)
  // await AdminDto.registerAuth(ctx.request.body)
  ctx.response.status = 200
  ctx.body = '注册成功'
})

router.post('/login', async (ctx) => {
  ctx.response.status = 200
  ctx.body = '注册成功'
})

module.exports = router