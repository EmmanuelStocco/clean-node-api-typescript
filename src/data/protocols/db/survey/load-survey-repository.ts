import { type SurveyModel } from '../../../../domain/models/survey'

export interface loadSurveysRepository {
  loadAll (): Promise<SurveyModel[]>
}
