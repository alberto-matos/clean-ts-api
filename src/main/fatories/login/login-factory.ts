import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeAuthentication } from '../authentication/authentication-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeAuthentication()
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoReposiory = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoReposiory)
}
