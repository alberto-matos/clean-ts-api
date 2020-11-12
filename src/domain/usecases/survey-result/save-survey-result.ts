import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultParams = {
  surveyId: string
  accountId: string
  answer: string
  date: Date
}

export type SaveSurveyResult = {
  save: (saveSurveyModel: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
