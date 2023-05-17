import { type HttpRequest, type Controller, type HttpResponse } from '../../presentation/protocols'
import { type LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'

export class LogControllerDecorator implements Controller { // soLid implementar uma classe no lugar de outro
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
