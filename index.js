const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

app.use(async (ctx, next)=>{
  await next()
  if(parseInt(ctx.status) === 404){  // 没有资源
    ctx.response.redirect("/404")
  }
})

const router = new Router()
router.get('/', async (ctx) =>{
  ctx.body = ctx.request.url
})
router.get('/about', async (ctx) =>{
  ctx.body = 'page about'
})
app.use(router.routes())


app.listen(3000,()=>{
  console.log('[demo] start-quick is starting at port 3000')
})