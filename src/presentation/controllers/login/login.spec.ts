import { badRequest } from '../../../presentation/helpers/http-helper'
import { MissingParamError } from '../../errors'
import { LoginController } from './login'

describe('Login Controller', () => {
  test('Should return 400 if no email is provider', async () => {
    const httpRequest = { body: { password: 'any_password' } }
    const sut = new LoginController()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
