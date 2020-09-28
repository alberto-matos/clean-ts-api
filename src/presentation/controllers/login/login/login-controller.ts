import { HttpRequest, HttpResponse, Controller, badRequest, serverError, unauthorized, Validation, Authentication, ok } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { ...authentication } = httpRequest.body
      const accessToken = await this.authentication.auth(authentication)

      if (accessToken === null) {
        return unauthorized()
      } else {
        return ok({ accessToken })
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
