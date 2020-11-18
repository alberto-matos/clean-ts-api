import { Controller, forbidden, HttpRequest, HttpResponse, InvalidParamError } from '../login/login/login-controller-protocols'
import { LoadSurveyById } from '../survey-result/save-survey-result/save-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveyId = httpRequest.params?.surveyId
    if (surveyId) {
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('SurveyId'))
      }
    }

    return null
  }
}
