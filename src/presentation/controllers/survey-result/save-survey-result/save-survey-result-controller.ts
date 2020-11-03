import { ok, Controller, HttpRequest, HttpResponse, LoadSurveyById, forbidden, InvalidParamError, serverError, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveyId = httpRequest.params?.surveyId
      const survey = await this.loadSurveyById.loadById(surveyId)
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      if (survey) {
        const answers = survey.answers.map(item => item.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
        const surveyResult = await this.saveSurveyResult.save({
          accountId,
          surveyId,
          answer,
          date: new Date()
        })
        return ok(surveyResult)
      }
      return forbidden(new InvalidParamError('surveyId'))
    } catch (error) {
      return serverError(error)
    }
  }
}
