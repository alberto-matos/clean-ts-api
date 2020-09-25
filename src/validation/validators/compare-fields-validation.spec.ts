import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

const makeFakeInput = (): Object => {
  return {
    field: 'any_content',
    fieldToCompare: 'any_content'
  }
}

describe('Required Field Validation', () => {
  test('Should return a InvalidParamError if RequiredFieldValidation fails', () => {
    const sut = makeSut()
    const error = sut.validate(Object.assign({}, { ...makeFakeInput() }, { fieldToCompare: 'other_content' }))
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('Should not return if CompareFieldValidation succeed', () => {
    const sut = makeSut()
    const error = sut.validate(makeFakeInput())
    expect(error).toBeFalsy()
  })
})
