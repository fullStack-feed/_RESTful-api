import router from '../item.router'

describe('item router', () => {
  test('拥有crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' },
      { path: '/', method: 'post' },
    ]
    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      // TODO: 如果测试出错了，如何提示呢？
      expect(match).toBeTruthy();
    })
  })
})