import { SignUpController } from '../../presentation/controllers/signUp/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}

// import { SignUpController } from '../../presentation/controllers/signUp/signup'
// import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
// import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
// import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
// import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
// import { type HttpRequest, type Controller, type HttpResponse } from '../../presentation/protocols'

// class LogControllerDecorator implements Controller {
//   private readonly controller: Controller

//   constructor (controller: Controller) {
//     this.controller = controller
//   }

//   async handle (httpRequest: HttpRequest): Promise<HttpResponse> {

//   }
// }

// export const makeSignUpController = (): SignUpController => {
//   const salt = 12
//   const emailValidatorAdapter = new EmailValidatorAdapter()
//   const bcryptAdapter = new BcryptAdapter(salt)
//   const accountMongoRepository = new AccountMongoRepository()
//   const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
//   return new SignUpController(emailValidatorAdapter, dbAddAccount)
// }
