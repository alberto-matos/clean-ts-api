import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { Controller, HttpRequest, HttpResponse, ok } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurvey: LoadSurveys) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurvey.load()
    return ok(surveys)
  }
}
