import { Router } from 'express'
import { makeSignupController } from '../fatories/signup/signup-factory'
import { adaptRoute } from '../config/adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
