import { type AddAccountRepository, type AccountModel, type AddAccount, type AddAccountModel, type Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encripter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encripter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassord = await this.encripter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassord }))
    return account
  }
}
