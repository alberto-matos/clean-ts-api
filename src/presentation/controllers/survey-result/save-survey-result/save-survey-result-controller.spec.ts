import { ok, HttpRequest, LoadSurveyById, SurveyModel, forbidden, InvalidParamError, serverError, SaveSurveyResult, SurveyResultModel } from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import MockDate from 'mockdate'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { mockLoadSurveyByIdRepository } from '@/data/test'

const makeFakeRequest = (): HttpRequest => {
  return {
    params: {
      surveyId: 'any_survey_id'
    },
    body: {
      answer: 'any_answer'
    },
    accountId: 'any_account_id'
  }
}

const makeFakeSurveyResultModel = (): SurveyResultModel => ({
  id: 'valid_id',
  surveyId: 'valid_survey_id',
  accountId: 'valid_account_id',
  answer: 'valid_answer',
  date: new Date()
})

const makeSaveSurveyResultStub = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (saveSurveyModel: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyResultModel()))
    }
  }

  return new SaveSurveyResultStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyByIdRepository()
  const saveSurveyResultStub = makeSaveSurveyResultStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}
describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = await jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeRequest().params.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    await jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValue(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 LoadSurvey throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(async (): Promise<SurveyModel> => { throw new Error() })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_survey_id'
      },
      body: {
        answer: 'wrong_answer'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = await jest.spyOn(saveSurveyResultStub, 'save')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: request.params.surveyId,
      accountId: request.accountId,
      date: new Date(),
      answer: request.body.answer
    })
  })

  test('Should return 500 SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(async (): Promise<SurveyResultModel> => { throw new Error() })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeSurveyResultModel()))
  })
})
