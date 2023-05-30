import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

describe('Survey Routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on survey whitout accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })

    test('Should return 204 on survey whit valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Emmanuel',
        email: 'emmanuel@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = res.insertedId
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })
  })

  describe('Get /surveys', () => {
    test('Should return 403 on load surveys whitout accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .expect(403)
    })

    // const mockAccessToken = async (): Promise<string> => {
    //   const res = await accountCollection.insertOne({
    //     name: 'Rodrigo',
    //     email: 'rodrigo.manguinho@gmail.com',
    //     password: '123',
    //     role: 'admin'
    //   })
    //   const id = res.insertedId.toHexString()
    //   const accessToken = sign({ id }, env.jwtSecret)
    //   await accountCollection.updateOne({
    //     _id: res.insertedId
    //   }, {
    //     $set: {
    //       accessToken
    //     }
    //   })
    //   return accessToken
    // }

    // test('Should return 204 on load surveys with valid accessToken', async () => {
    //   const accessToken = await mockAccessToken()
    //   await request(app)
    //     .get('/api/surveys')
    //     .set('x-access-token', accessToken)
    //     .expect(204)
    // })
  })
})
