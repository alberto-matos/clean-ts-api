import { DbLoadSurveyById, SurveyMongoRepository, LoadSurveyById } from '.'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
