import {
  SignUpController, EmailValidatorAdapter, DbAddAccount, BcryptAdapter,
  AccountMongoRepository, Controller, LogControllerDecorator, LogMongoRepository
} from './'
import env from '../../main/config/env'

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logMongoReposiory = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoReposiory)
}
