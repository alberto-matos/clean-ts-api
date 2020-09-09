import { Router } from 'express'
import { makeSignupController } from '../fatories/signup'
import { adaptRoute } from '../config/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
