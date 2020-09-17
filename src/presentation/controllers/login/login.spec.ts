import { HttpRequest, badRequest, serverError, unauthorized, MissingParamError, Validation, Authentication, ok } from './login-protocols'
import { LoginController } from './login'

const makeRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

interface sutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): sutTypes => {
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const httpRequest = makeRequest()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith(httpRequest.body.email, httpRequest.body.password)
  })
  test('Should return 401 if invalid authentication', async () => {
    const { sut, authenticationStub } = makeSut()
    const httpRequest = makeRequest()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })
  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    const httpRequest = makeRequest()
    jest.spyOn(authenticationStub, 'auth').mockImplementation(() => {
      throw Error('any error')
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error('any error')))
  })
  test('Should return 200 if valid authentication', async () => {
    const { sut } = makeSut()
    const httpRequest = makeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns error', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = makeRequest()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
