import { AddSurvey } from '../../../domain/usecases/add-survey'
import { badRequest, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation, noContent } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return await new Promise(resolve => resolve(badRequest(error)))
      }
      const { question, answers } = httpRequest.body
      const date = new Date()
      await this.addSurvey.add({
        question,
        answers,
        date
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
