import { Controller, makeLoginValidation, LoginController, makeAuthentication, makeLogControllerDecorator } from '.'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}
