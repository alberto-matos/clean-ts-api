import { MissingParamError } from '../../errors/missing-param-error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Field Validation', () => {
  test('Should return a MissingParamError if RequiredFieldValidation fails', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('email'))
  })
})
