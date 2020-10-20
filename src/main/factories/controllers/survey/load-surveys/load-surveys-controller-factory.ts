import { Controller, LoadSurveysController, makeLogControllerDecorator, makeLoadSurveys } from './'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveys = makeLoadSurveys()
  const loadSurveysController = new LoadSurveysController(loadSurveys)
  return makeLogControllerDecorator(loadSurveysController)
}
