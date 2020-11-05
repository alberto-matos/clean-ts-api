import { DbLoadSurveyById, SurveyMongoRepository } from '.'

export const makeLoadSurveyById = (): DbLoadSurveyById => {
  const surveyResultMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyResultMongoRepository)
}
