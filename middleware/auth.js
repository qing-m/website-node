/*
 * @Author: 王鹤垚
 * @LastEditors: 王鹤垚
 */
const jwt = require('jsonwebtoken')
const { TokenType } = require('../app/lib/enums')

const { AuthFailed, ExpiredToken, InvalidToken, Forbidden } = require('@exception')


async function parseHeader(ctx, type = TokenType.ACCESS) {
  if(!ctx.header || !ctx.header.token) {
    throw new AuthFailed({msg: '认证失败，请检查令牌是否正确'})
  }
  const token = ctx.header.token
  const secretKey = ctx.header.uuid
  let decode
  try {
    decode = jwt.verify(token,secretKey)
    if(decode.uuId !== secretKey) {
      throw new InvalidToken({ msg: '认证失败，令牌失效'})
    }
  } catch (error) {
    if(error.name === 'TokenExpiredError') {
      throw new ExpiredToken({ msg: '认证失败，token已过期' })
    }else {
      throw new InvalidToken({ msg: '认证失败，令牌失效'})
    }
  }
  // 权限验证
  if (!decode.scope || decode.scope < ctx.level) {
    throw new Forbidden({ msg: '权限不足' })
  }
  ctx.auth = {
    uid: decode.uid,
    scope: decode.scope
  }
}

class Auth {
  constructor (level) {
    // 初始化权限，判断权限调用接口
    this.level = level || 1
  }

  get m() {
    return async (ctx, next) => {
      // 赋值权限字段 下面进行调用
      ctx.level = this.level
      // 需要登录接口逻辑
      return await loginRequired(ctx, next)
    }
  }
}

const loginRequired = async function (ctx, next) {
  if (ctx.request.method !== 'OPTIONS') {
    // 解析requestHeader
    await parseHeader(ctx, TokenType.ACCESS)
    await next()
  } else {
    // method === 'OPTIONS' 直接 next() 处理
    await next()
  }
}

/**
 * 生成令牌
 * @param {number} uid
 * @param {number} scope
 * @param {TokenType} type 
 * @param {Object} options 
 */
 const generateToken = function (uuId, scope, type = TokenType.ACCESS, options) {
  const secretKey = uuId
  const token = jwt.sign({
      uuId,
      scope,
      type
  }, secretKey, {
      expiresIn: options.expiresIn || '24h'
  })
  return token
}

module.exports = {
  Auth,
  generateToken
}