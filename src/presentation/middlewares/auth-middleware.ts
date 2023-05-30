import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import {
  AccessDeniedError,
  type LoadAccountByToken,
  type HttpRequest,
  type HttpResponse,
  type Middleware
} from './aut-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (accessToken) {
        console.log('accessToken authMiddleware', accessToken)
        console.log('this.role authMiddleware', this.role)

        const account = await this.loadAccountByToken.load(accessToken, this.role)
        console.log('account authMiddleware', account)

        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
