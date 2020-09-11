import { badRequest } from '../../../presentation/helpers/http-helper'
import { HttpRequest } from '../../protocols'
import { MissingParamError } from '../../errors'
import { LoginController } from './login'

const makeRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }
}
const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provider', async () => {
    const httpRequest = makeRequest()
    delete (httpRequest.body.email)
    const sut = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('Should return 400 if no password is provider', async () => {
    const httpRequest = makeRequest()
    delete (httpRequest.body.password)
    const sut = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
