import { Controller, HttpRequest, HttpResponse, LoadSurveyById, ok, forbidden, InvalidParamError, serverError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params?.surveyId)
      return survey ? ok(survey) : forbidden(new InvalidParamError('surveyId'))
    } catch (error) {
      return serverError(error)
    }
  }
}
