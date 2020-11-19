import { Controller, makeLogControllerDecorator, SaveSurveyResultController, makeDbSaveSurveyResult, makeDbLoadSurveyById } from '.'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResultController = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(saveSurveyResultController)
}
