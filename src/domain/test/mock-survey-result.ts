import { SurveyResultModel } from '../models/survey-result'
import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result'

export const mockSurveyResultParams = (): SaveSurveyResultParams => {
  return {
    surveyId: 'any_id',
    accountId: 'any_account_id',
    answer: 'any_answer1',
    date: new Date()
  }
}

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer1',
    count: 0,
    percent: 0
  }, {
    answer: 'any_answer2',
    image: 'any_image',
    count: 0,
    percent: 0
  }
  ],
  date: new Date()
})

export const mockSurveyResultEmptyModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer1',
    count: 0,
    percent: 0
  }, {
    answer: 'any_answer2',
    image: 'any_image',
    count: 0,
    percent: 0
  }],
  date: new Date()
})
