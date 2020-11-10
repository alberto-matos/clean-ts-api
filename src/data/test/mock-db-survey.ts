import { AddSurveyRepository } from '../protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '../usercases/survey/add-survey/db-add-survey-protocols'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}
