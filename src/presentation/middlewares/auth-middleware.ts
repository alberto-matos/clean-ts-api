import { accessDenied } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.headers) {
      return await Promise.resolve(accessDenied())
    }
  }
}
