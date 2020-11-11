import request from 'supertest'
import app from '../config/app'
import { swaggerNoCache } from '@/main/middlewares'

describe('Swagger-no-cache Middleware', () => {
  test('Should enable Swagger no cache', async () => {
    app.get('/test_swagger', swaggerNoCache, (_req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_swagger')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
