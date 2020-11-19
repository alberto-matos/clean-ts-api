import { throwError, mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { mockLoadSurveyById, mockHttpRequest, mockLoadSurveyResult } from '@/presentation/test/mock-load-survey-result'
import { forbidden, InvalidParamError, LoadSurveyById, serverError } from '../survey-result/save-survey-result/save-survey-result-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'
import Mockdate from 'mockdate'

type sutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  loadSurveyResultStub: LoadSurveyResult
}

const makeSut = (): sutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const loadSurveyResultStub = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub
  }
}

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockHttpRequest().params.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('SurveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')
    await sut.handle(mockHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockHttpRequest().params.surveyId)
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 and SurveyResultModel correct on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(mockSurveyResultModel())
  })
})
