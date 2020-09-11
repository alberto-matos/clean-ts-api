import {
  HttpRequest, HttpResponse, Controller, badRequest, serverError, unauthorized,
  MissingParamError, InvalidParamError, EmailValidator, Authentication
} from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requeredFields = ['email', 'password']
      const { email, password } = httpRequest.body
      for (const field of requeredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (accessToken === null) {
        return unauthorized()
      } else {
        return {
          statusCode: 200,
          body: {
            accessToken
          }
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
