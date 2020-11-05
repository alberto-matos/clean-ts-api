import { SurveyResultMongoRepository, DbSaveSurveyResult } from './'

export const makeSaveSurveyResult = (): DbSaveSurveyResult => {
  const surveyMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyMongoRepository)
}
