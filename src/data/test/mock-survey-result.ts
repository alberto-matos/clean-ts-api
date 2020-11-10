import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository'
import { SaveSurveyResultParams } from '../usercases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (surveyData: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(mockSurveyResultModel()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
