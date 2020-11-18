import { mockSurveyModel } from '@/domain/test'
import { HttpRequest, LoadSurveyById, SurveyModel } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (surveyId: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockHttpRequest = (): HttpRequest => {
  return {
    params: {
      surveyId: 'any_id'
    }
  }
}
