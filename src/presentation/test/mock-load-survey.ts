import { mockSurveysModel } from '@/domain/test'
import { LoadSurveys, SurveyModel } from '../controllers/survey/load-survey/load-surveys-controller-protocols'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveyStub()
}
