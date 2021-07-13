const Router = require('koa-router')

const { CreateAuthNumberValidator, LoginValidator } = require('@validators/admin')
const { Auth } =  require('@middleware/auth')
const { AdminDao } =  require('@dao/admin')
const { Success } = require('@exception')

const router = new Router({
  prefix: '/api/v1/admin'
})

const AdminDto = new AdminDao()

router.post('/register', async (ctx) => {
  const v = await new CreateAuthNumberValidator().validate(ctx)
  await AdminDto.registerAuth(v)
  throw new Success('注册成功')
})

router.post('/login', async (ctx) => {
  const v = await new LoginValidator().validate(ctx)
  // console.log(v)
  // ctx.body = '11111'
})

module.exports = router