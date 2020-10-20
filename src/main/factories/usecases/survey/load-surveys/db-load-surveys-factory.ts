import { DbLoadSurveys, SurveyMongoRepository } from './'

export const makeLoadSurveys = (): DbLoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
