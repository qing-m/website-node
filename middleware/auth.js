const { TokenType } = require('../app/lib/enums')

async function parseHeader(ctx, type = TokenType.ACCESS) {
  console.log(ctx.header)
  console.log(type)
}


class Auth {
  constructor (level) {
    this.level = level || 1
  }

  get m() {
    return async (ctx, next) => {
      ctx.level = this.level
      return await loginRequired(ctx, next)
    }
  }
}

const loginRequired = async function (ctx, next) {
  if (ctx.request.method !== 'OPTIONS') {
    await parseHeader(ctx, TokenType.ACCESS)
    await next()
  } else {
    await next()
  }
}


module.exports = {
  Auth,
}