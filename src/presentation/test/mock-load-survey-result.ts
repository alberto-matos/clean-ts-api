import { mockSurveyModel, mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { HttpRequest, LoadSurveyById, SurveyModel, SurveyResultModel } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

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

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}
