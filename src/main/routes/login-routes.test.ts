import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Emmanuel',
          email: 'emmanuel@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on success', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Emmanuel',
        email: 'emmanuel@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'emmanuel@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on success', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'emmanuel@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
