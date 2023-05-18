import { type AddAccountRepository, type AccountModel, type AddAccount, type AddAccountModel, type Hasher, type LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassord = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassord }))
      return newAccount
    }
    return null
  }
}
