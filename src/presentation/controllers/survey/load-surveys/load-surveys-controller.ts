import { ok } from '../../../helpers/http/http-helper'
import { type Controller, type HttpRequest, type HttpResponse, type LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()

    return ok(surveys)
  }
}