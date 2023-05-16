import { type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const mockAddAccountParams = ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const addAccountParams = mockAddAccountParams
    const isValid = await sut.add(addAccountParams)
    expect(isValid).toBe(true)
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
  })
})
