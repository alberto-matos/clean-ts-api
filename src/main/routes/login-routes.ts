import { Router } from 'express'
import { adaptRoute } from '../config/adapters/express/express-route-adapter'
import { makeSignupController } from '../fatories/signup/signup-factory'
import { makeLoginController } from '../fatories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
