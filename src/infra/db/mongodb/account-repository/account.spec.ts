import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const mockAddAccountParams = ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const addAccountParams = mockAddAccountParams
    const isValid = await sut.add(addAccountParams)
    expect(isValid).toBe(true)
  })
})
