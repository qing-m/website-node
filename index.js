const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

app.use(async (ctx)=>{
  ctx.body = '404'
})

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