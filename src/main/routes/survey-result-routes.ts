import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-surveys-result-controller-factory'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'
import { commonAuth } from '@/main/middlewares/common-auth'
// import { adminAuth } from '../middlewares/admin-auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', commonAuth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', commonAuth, adaptRoute(makeLoadSurveyResultController()))
}
