const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser') //对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const static  = require('koa-static')
const path = require('path')

const app = new Koa()
app.use(bodyParser())
const staticPath = './static'
app.use(static(
  path.join( __dirname,  staticPath)
))

const router = new Router()
router.get('/about', async (ctx) =>{
  ctx.body = {
    query: ctx.query,
    queryString: ctx.querystring
  }
})
router.get('/form', async (ctx) => {
  let html = `
    <h1>koa2 request post demo</h1>
    <form method="POST" action="/api">
      <p>userName</p>
      <input name="userName" /><br/>
      <p>nickName</p>
      <input name="nickName" /><br/>
      <p>email</p>
      <input name="email" /><br/>
      <button type="submit">submit</button>
    </form>
  `
  ctx.body = html
})
router.post('/api', async (ctx) =>{
  let postData = ctx.request.body
  ctx.body = postData
})
app.use(router.routes())

app.listen(3000,()=>{
  console.log('[demo] start-quick is starting at port 3000')
})