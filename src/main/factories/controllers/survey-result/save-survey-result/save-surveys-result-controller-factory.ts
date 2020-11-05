import { makeLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { Controller, makeLogControllerDecorator, SaveSurveyResultController, makeSaveSurveyResult } from '.'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResult = makeSaveSurveyResult()
  const loadSurveyById = makeLoadSurveyById()
  const saveSurveyResultController = new SaveSurveyResultController(loadSurveyById, saveSurveyResult)
  return makeLogControllerDecorator(saveSurveyResultController)
}
