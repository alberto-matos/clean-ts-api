import {
  accountSchema, loginParamsSchema, errorSchema, surveySchema, surveyAnswerSchema, surveysSchema,
  signupParamsSchema, addSurveySchema, saveSurveyResultParamsSchema, surveyResultSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  surveys: surveysSchema,
  signupParams: signupParamsSchema,
  addSurveyParams: addSurveySchema,
  saveSurveyResultParams: saveSurveyResultParamsSchema,
  surveyResult: surveyResultSchema
}
