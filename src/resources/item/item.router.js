import { Router } from 'express';
let mockResolver = (req, res) => {
  res.json({ message: 'ok' })
}
const router = Router();

// 注意此处 是 相对路由路径，当router 挂载后，会进行前缀拼接
router
  .route('/')
  .get(mockResolver)
  .post(mockResolver)

router
  .route('/:id')
  .get(mockResolver)
  .put(mockResolver)
  .delete(mockResolver)

export default router