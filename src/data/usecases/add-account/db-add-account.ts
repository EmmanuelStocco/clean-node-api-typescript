import { type AccountModel, type AddAccount, type AddAccountModel, type Encrypter } from './db-add-account-protocols'

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
