import { SurveyResultMongoRepository, DbSaveSurveyResult, SaveSurveyResult } from './'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyMongoRepository)
}
