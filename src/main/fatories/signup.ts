import {
  SignUpController, EmailValidatorAdapter, DbAddAccount, BcryptAdapter,
  AccountMongoRepository, Controller, LogControllerDecorator
} from './'
import env from '../../main/config/env'

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signupController)
}
