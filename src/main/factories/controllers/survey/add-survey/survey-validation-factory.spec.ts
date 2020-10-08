import { makeAddSurveyValidation } from './survey-validation-factory'
import { Validation, ValidationComposite, RequiredFieldValidation } from '.'

jest.mock('../../../../../validation/validators/validation-composite')

describe('SurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
