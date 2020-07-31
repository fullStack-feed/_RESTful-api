import express, { Router } from "express";
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser'
export const app = new express();
const router = express.Router();
const port = 7071;
// miss掉 Express 默认前缀
app.disable('x-powered-by')

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev')) // 使用路由日志中间件

/**
 * Router 和  RESTful
 * 
 * RESTful: HTTP methods（动词） + router（宾语）
 * 
 * 路由匹配模式: 精确匹配，动态参数， 正则表达式（不让同事喜欢）
 */

/**
 * Router 中的 next()
 * 
 * 永远不要这样在Router中使用 next() 
 * 
 * 虽然！ 它能够和中间件一样正常的工作（使用上和实现上没有任何的区别）
 * 
 * 但是！按照语义他是专属 middleware 的
 * 
 */

// 不要这样抖机灵使用Router next()
// 不过也能发现，router在使用时还是需要注意顺序的（当有多个相同路由时，不常见）

app.get('/', (req, res) => {
  console.log(`我也会执行`);
  // next();
})

app.get('/', (req, res) => {
  res.send({
    message: 'hello express'
  })
})
// 精确匹配
app.post('/data', (req, res) => {
  console.log(req.body);
  res.send(req.body)
})
// 动态参数匹配
app.get('/:id', (req, res) => {
  console.log('动态路由匹配成功,可以通过req.params获取url中的参数',)
  res.send(req.params)
})

/**
 * Router 中的 二级路由
 * 
 */

let childRouter = router.get('/getmessage', (req, res) => {
  res.send({
    mes: "hi! 我是二级路由"
  })
})
app.use('/child', childRouter)

// TODO: 路由链式调用？？？

export const start = () => {
  app.listen(port, () => {
    console.log(`server is ok at : ${port}`);
  })
}