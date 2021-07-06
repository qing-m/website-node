const { TokenType } = require('../app/lib/enums')

const { AuthFailed } = require('@exception')

async function parseHeader(ctx, type = TokenType.ACCESS) {
  if(!ctx.header || !ctx.header.token) {
    throw new AuthFailed({msg: '认证失败，请检查令牌是否正确'})
  }
  ctx.Auth = {
    uid: '1'
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


module.exports = {
  Auth,
}