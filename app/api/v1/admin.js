/*
 * @Author: your name
 * @Date: 2021-05-26 11:34:02
 * @LastEditTime: 2021-12-06 15:49:16
 * @LastEditors: 王鹤垚
 * @Description: In User Settings Edit
 * @FilePath: \website-node\app\api\v1\admin.js
 */
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

  const accessToken = generateToken(author.uuId, author.id, TokenType.ACCESS, { expiresIn: global.config.security.expiresIn })
  ctx.body = {
    msg: '登录成功',
    errorCode: 0,
    request: 'POST: /api/v1/admin/login',
    data: {
      token: accessToken,
      uuId: author.uuId
    }
  }
})

router.get('/core/getUserInfo', new Auth().m, async (ctx) => {
  const v = await new GetUserInfoValidator().validate(ctx)
  const author = await AdminDto.getUserInfoAuth(v)
  const id = author['id']
  const email = author['email']
  const nickName = author['nickName']
  const sex = author['sex']
  const displayName = author['displayName']
  const uuId = author['uuId']
  ctx.body = {
    msg: '获取成功',
    errorCode: 0,
    request: 'POST: /core/getUserInfo',
    data: {
      id,
      email,
      nickName,
      sex,
      displayName,
      uuId,
      avatar: 'https://outin-ede8be7da1c311ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/image/default/C0D3C14D40EA4C23A005032E0E5E3887-6-2.png'
    }
  }
})

module.exports = router