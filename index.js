const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser') //对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const app = new Koa()
app.use(bodyParser())

app.use( async ( ctx ) => {
  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
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
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})


const router = new Router()
router.get('/about', async (ctx) =>{
  ctx.body = {
    query: ctx.query,
    queryString: ctx.querystring
  }
})
app.use(router.routes())

app.listen(3000,()=>{
  console.log('[demo] start-quick is starting at port 3000')
})