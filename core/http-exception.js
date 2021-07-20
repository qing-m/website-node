// 请求错误
class HttpException extends Error {
  constructor(msg='服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

// 参数错误
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
    this.code = 400
  }
}

// 成功请求
class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
    this.code = 200
  }
}

// 404
class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '资源不存在'
    this.errorCode = errorCode || 10004
    this.code = 404
  }
}

// 禁止访问
class Forbidden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10003
    this.code = 403
  }
}

// 认证失败
class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '认证失败'
    this.errorCode = errorCode || 10010
    this.code = 401
  }
}

// 无效token
class InvalidToken extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '令牌失效'
    this.errorCode = errorCode || 10020
    this.code = 401
  }
}

// token过期
class ExpiredToken extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '令牌过期'
    this.errorCode = errorCode || 10030
    this.code = 422
  }
}

// 重新获取token失败
class RefreshException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'refresh token 获取失败'
    this.errorCode = errorCode || 10100
    this.code = 401
  }
}

// 文件体积过大
class FileTooLargeException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '文件体积过大'
    this.errorCode = errorCode || 10110
    this.code = 413
  }
}

// 文件数量太多
class FileTooManyException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '文件数量过多'
    this.errorCode = errorCode || 10120
    this.code = 413
  }
}

// 扩展名不符合规范
class FileExtensionException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '文件扩展名不符合规范'
    this.errorCode = errorCode || 10130
    this.code = 401
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  Forbidden,
  AuthFailed,
  InvalidToken,
  ExpiredToken,
  RefreshException,
  FileTooLargeException,
  FileTooManyException,
  FileExtensionException,
}