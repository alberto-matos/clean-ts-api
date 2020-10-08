import { Router } from 'express'
import { adaptRoute } from '../config/adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
