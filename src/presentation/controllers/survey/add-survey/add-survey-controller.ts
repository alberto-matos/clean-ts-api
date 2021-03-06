import { Controller, HttpRequest, HttpResponse, Validation, noContent } from './add-survey-controller-protocols'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return await Promise.resolve(badRequest(error))
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
