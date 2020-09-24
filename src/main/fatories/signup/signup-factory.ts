import { SignUpController, DbAddAccount, BcryptAdapter, AccountMongoRepository, Controller, LogControllerDecorator, LogMongoRepository } from '.'
import env from '../../config/env'
import { makeAuthentication } from '../authentication/authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const authentication = makeAuthentication()
  const signupController = new SignUpController(dbAddAccount, makeSignupValidation(), authentication)
  const logMongoReposiory = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoReposiory)
}
