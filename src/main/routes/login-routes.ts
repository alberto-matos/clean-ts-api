import { Router } from 'express'
import { adaptRoute } from '../config/adapters/express/express-route-adapter'
import { makeSignupController } from '../fatories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../fatories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
