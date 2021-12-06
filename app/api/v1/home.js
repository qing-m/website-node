/*
 * @Author: 王鹤垚
 * @LastEditors: 王鹤垚
 */
const Router = require('koa-router')

const { Auth } =  require('@middleware/auth')

const { homeDao } =  require('@dao/home')

const { Success } = require('@exception')

const router = new Router({
  prefix: '/api/v1/home'
})

const homeDto = new homeDao()

router.post('/getChatList', new Auth().m, async (ctx) => {
  throw new Success('成功')
})