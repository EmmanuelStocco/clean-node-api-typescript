import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_cors')
      .expect('acess-control-allow-origin', '*')
      .expect('acess-control-allow-methods', '*')
      .expect('acess-control-allow-origin-headers', '*')
  })
})
