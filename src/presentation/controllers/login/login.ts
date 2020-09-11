import { HttpRequest, HttpResponse } from '../../protocols'
import { Controller } from '../../protocols/controller'
import { badRequest } from '../../../presentation/helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requeredFields = ['email', 'password']
    for (const field of requeredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { email } = httpRequest.body
    if (!this.emailValidator.isValid(email)) {
      return badRequest(new InvalidParamError('email'))
    }
    return null
  }
}
