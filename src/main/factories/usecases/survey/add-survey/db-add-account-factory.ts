import { DbAddSurvey, SurveyMongoRepository } from '.'

export const makeAddSurvey = (): DbAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
