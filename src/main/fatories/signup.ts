import {
  SignUpController, EmailValidatorAdapter, DbAddAccount, BcryptAdapter,
  AccountMongoRepository, Controller, LogControllerDecorator, LogMongoRepository
} from './'
import env from '../../main/config/env'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignupValidation())
  const logMongoReposiory = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoReposiory)
}
