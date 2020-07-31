import express, { Router } from "express";
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser'
export const app = new express();
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'
const router = express.Router();
const port = 7071;
// miss掉 Express 默认前缀
app.disable('x-powered-by')

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev')) // 使用路由日志中间件

console.log(userRouter);
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

export const start = () => {
  app.listen(port, () => {
    console.log(`server is ok at : ${port}`);
  })
}