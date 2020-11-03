import { Controller, HttpRequest, HttpResponse, LoadSurveyById, ok, forbidden, InvalidParamError, serverError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params?.surveyId)
      const { answer } = httpRequest.body
      if (survey) {
        const answers = survey.answers.map(item => item.answer)
        return answers.includes(answer) ? ok(survey) : forbidden(new InvalidParamError('answer'))
      }
      return survey ? ok(survey) : forbidden(new InvalidParamError('surveyId'))
    } catch (error) {
      return serverError(error)
    }
  }
}
