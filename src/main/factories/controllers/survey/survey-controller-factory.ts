import { Controller, AddSurveyController, makeLogControllerDecorator, makeAddSurveyValidation, makeAddSurvey } from '.'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}
