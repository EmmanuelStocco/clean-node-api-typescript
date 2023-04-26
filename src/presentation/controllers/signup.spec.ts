import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Shoul return 400 if no name is provided', () => {
    const sut = new SignUpController()
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
    expect(httpReponse.body).toEqual(new Error('Missign param: name'))
  })

  test('Shoul return 400 if no email is provided', () => {
    const sut = new SignUpController()
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
    expect(httpReponse.body).toEqual(new Error('Missign param: email'))
  })
})
