import { Controller, forbidden, HttpRequest, HttpResponse, InvalidParamError, serverError } from '../login/login/login-controller-protocols'
import { LoadSurveyById } from '../survey-result/save-survey-result/save-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveyId = httpRequest.params?.surveyId
      if (surveyId) {
        const survey = await this.loadSurveyById.loadById(surveyId)
        if (!survey) {
          return forbidden(new InvalidParamError('SurveyId'))
        }
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
