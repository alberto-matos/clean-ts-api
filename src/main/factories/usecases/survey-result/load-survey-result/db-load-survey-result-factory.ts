import { SurveyResultMongoRepository, DbLoadSurveyResult, LoadSurveyResult, SurveyMongoRepository } from '.'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyMongoRepository = new SurveyResultMongoRepository()
  const loadSurveyRespository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyMongoRepository, loadSurveyRespository)
}
