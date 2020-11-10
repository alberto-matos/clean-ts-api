import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result'

export const mockSurveyResultParams = (): SaveSurveyResultParams => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}
