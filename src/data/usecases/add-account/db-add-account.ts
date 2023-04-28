import { type AddAccount, type AddAccountModel } from '../../../domain/usecases/add-account'
import { type AccountModel } from '../../../domain/models/account'
import { type Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encripter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encripter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encripter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
