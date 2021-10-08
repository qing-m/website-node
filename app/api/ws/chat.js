const Router = require('koa-router')

const router = new Router({
  prefix: '/wx/chat'
})
router.post('/message', async (ctx) =>{
  console.log(ctx)
  ctx.websocket.on("message", (message) => {
    console.log(message);
  });
})

module.exports = router