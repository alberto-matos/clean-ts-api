import { Controller, HttpRequest, HttpResponse } from '../login/login/login-controller-protocols'
import { LoadSurveyById } from '../survey-result/save-survey-result/save-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveyId = httpRequest.params?.surveyId
    if (surveyId) {
      await this.loadSurveyById.loadById(surveyId)
    }
    return null
  }
}
