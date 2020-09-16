import {
  SignUpController, DbAddAccount, BcryptAdapter,
  AccountMongoRepository, Controller, LogControllerDecorator, LogMongoRepository
} from './'
import env from '../../main/config/env'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signupController = new SignUpController(dbAddAccount, makeSignupValidation())
  const logMongoReposiory = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoReposiory)
}
