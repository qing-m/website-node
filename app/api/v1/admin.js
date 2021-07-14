const Router = require('koa-router')

const { CreateAuthNumberValidator, LoginValidator } = require('@validators/admin')
const { Auth, generateToken } =  require('@middleware/auth')
const { AdminDao } =  require('@dao/admin')
const { Success } = require('@exception')

const { TokenType } = require('../../lib/enums')

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
  const author = await AdminDto.loginAuth(v)

  const accessToken = generateToken(author.id, author.email, TokenType.ACCESS, { expiresIn: global.config.security.expiresIn })
  const refreshToken = generateToken(author.id, author.email, TokenType.REFRESH, { expiresIn: global.config.security.refreshExp })
  ctx.body = {
    msg: '登录成功',
    errorCode: 0,
    request: 'POST: /api/v1/admin/logi',
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }
})

module.exports = router