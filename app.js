require('module-alias/register') // 文件夹别名

const Koa = require('koa')
const InitManager = require('./core/init')
const catchError = require('./middleware/exception.js')
const parser = require('koa-bodyparser')
const cors = require('koa2-cors')

const app = new Koa()

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

app.use(cors())
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(8808,()=>{
  console.log('server listen to 8808')
})