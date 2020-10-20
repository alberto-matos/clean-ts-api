import { Controller, HttpRequest, HttpResponse, ok, serverError } from './load-surveys-controller-protocols'
import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { noContent } from '@/presentation/helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurvey: LoadSurveys) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
