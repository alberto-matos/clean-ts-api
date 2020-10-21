import { SurveyModel } from '@/domain/models/survey'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

// export type AddSurveyModel = {
//   question: string
//   answers: SurveyAnswerModel[]
//   date: Date
// }

export type AddSurvey = {
  add: (addSurveyModel: AddSurveyModel) => Promise<void>
}
