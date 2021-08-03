const Router = require('koa-router')

const { 
  CreateAuthNumberValidator,
  LoginValidator,
  GetUserInfoValidator 
} = require('@validators/admin')
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

  const accessToken = generateToken(author.uuId, author.email, TokenType.ACCESS, { expiresIn: global.config.security.expiresIn })
  ctx.body = {
    msg: '登录成功',
    errorCode: 0,
    request: 'POST: /api/v1/admin/login',
    data: {
      token: accessToken,
    }
  }
})

router.get('/core/getUserInfo', async (ctx) => {
  const v = await new GetUserInfoValidator().validate(ctx)
  const author = await AdminDao.getUserInfoAuth(v)
  ctx.body = {
    msg: '获取成功',
    errorCode: 0,
    request: 'POST: /core/getUserInfo',
    data: {
      ...author,
      avatar: 'https://outin-ede8be7da1c311ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/image/default/C0D3C14D40EA4C23A005032E0E5E3887-6-2.png'
    }
  }
})

module.exports = router