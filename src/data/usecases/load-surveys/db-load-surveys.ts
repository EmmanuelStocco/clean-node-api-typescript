import { type SurveyModel } from '../../../domain/models/survey'
import { type LoadSurveys } from '../../../domain/usecases/load-surveys'
import { type LoadSurveysRepository } from '../../protocols/db/survey/load-survey-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    const suveys = await this.loadSurveysRepository.loadAll()
    return suveys
  }
}
