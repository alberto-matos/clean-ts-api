import { Controller, HttpRequest, HttpResponse, LoadSurveyById, ok, forbidden } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params?.surveyId)
    return survey ? ok(survey) : forbidden(new Error('Survey not found'))
  }
}
