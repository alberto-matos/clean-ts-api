import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

const makeValidationsStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    makeValidationsStub(),
    makeValidationsStub()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

const makeFakeInput = (): Object => {
  return {
    field1: 'any_content',
    field2: 'any_content'
  }
}

describe('Validation Composite', () => {
  test('Should call ValidationComposite with correct values', () => {
    const { sut, validationStubs } = makeSut()
    const validateSpy = jest.spyOn(validationStubs[0], 'validate')
    sut.validate(makeFakeInput())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeInput())
  })

  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(null)
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate(makeFakeInput())
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error(''))
    const error = sut.validate(makeFakeInput())
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return ValidationComposite if validation succeed', () => {
    const { sut } = makeSut()
    const error = sut.validate(makeFakeInput())
    expect(error).toBeFalsy()
  })
})
