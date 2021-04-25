const Koa = require('koa')
const app = new Koa()

const HelloWorld = async (ctx) => {
  ctx.body = 'HelloWorld'
}
app.use(HelloWorld)


app.listen(3000,()=>{
  console.log('[demo] start-quick is starting at port 3000')
})