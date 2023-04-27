import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { type EmailValidator } from '../protocols/email-validator'
import { ServerError } from '../errors/server-error copy'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Shoul return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_emai@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('name'))
  })

  test('Shoul return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: 'any_emai@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('email'))
  })

  test('Shoul return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_emai@mail.com',
        // password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('password'))
  })

  test('Shoul return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_emai@mail.com',
        password: 'any_password'
        // passwordConfirmation: 'any_password'
      }
    }

    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Shoul return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_emai@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
    expect(httpReponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Shoul call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_emai@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_emai@mail.com')
  })

  test('Shoul return 500 if EmailValidator throws', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_emai@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(500)
    expect(httpReponse.body).toEqual(new ServerError())
  })
})
