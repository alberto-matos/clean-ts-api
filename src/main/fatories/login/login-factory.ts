import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from '../../../data/usercases/authentication/db-authentication'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../main/config/env'

export const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcryptAdapter(env.salt)
  const jwtAdapter = new JwtAdapter(env.secretKey)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoReposiory = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoReposiory)
}
