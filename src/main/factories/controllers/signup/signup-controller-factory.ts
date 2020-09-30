import { SignUpController, Controller, makeAddAccount, makeAuthentication, makeSignupValidation, makeLogControllerDecorator } from '.'

export const makeSignupController = (): Controller => {
  const signupContorller = new SignUpController(makeAddAccount(), makeSignupValidation(), makeAuthentication())
  return makeLogControllerDecorator(signupContorller)
}
