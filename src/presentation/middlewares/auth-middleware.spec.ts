import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../protocols'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers',async () => {
    const sut = new AuthMiddleware()
    // const httpRequest: HttpRequest = {
    //   headers: {
    //   }
    // }
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
