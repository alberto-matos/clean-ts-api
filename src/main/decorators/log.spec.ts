import { Controller, HttpRequest, HttpResponse } from '../../presentation/controllers/signup/signup-protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
          }
        }
        return await new Promise(resolve => resolve(httpResponse))
      }
    }
    const controllerStup = new ControllerStub()
    const sut = new LogControllerDecorator(controllerStup)
    const handleStub = jest.spyOn(controllerStup, 'handle')
    const httpRequest: HttpRequest = {
      body: {
        name: 'Daiane',
        email: 'daiane@email.com',
        password: '123456'
      }
    }
    await sut.handle(httpRequest)
    expect(handleStub).toHaveBeenCalledWith(httpRequest)
  })
})
