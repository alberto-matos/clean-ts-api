import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidationsStub = (): Validation[] => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return [new ValidationStub()]
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationsStub()
  const sut = new ValidationComposite(validationStub)
  return {
    sut,
    validationStub
  }
}

const makeFakeInput = (): Object => {
  return {
    field1: 'any_content',
    field2: 'any_content'
  }
}

describe('Validation Composite', () => {
  test('Should call ValidationComposite correct values', () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub[0], 'validate')
    sut.validate(makeFakeInput())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeInput())
  })
})
