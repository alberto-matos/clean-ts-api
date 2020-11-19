import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { Controller, forbidden, HttpRequest, HttpResponse, InvalidParamError, ok, serverError } from '../login/login/login-controller-protocols'
import { LoadSurveyById } from '../survey-result/save-survey-result/save-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveyId = httpRequest.params.surveyId
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('SurveyId'))
      }

      const surveyResult = await this.loadSurveyResult.load(surveyId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
