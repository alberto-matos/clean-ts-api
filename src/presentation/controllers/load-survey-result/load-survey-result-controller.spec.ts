import { mockLoadSurveyById, mockHttpRequest } from '@/presentation/test/mock-load-survey-result'
import { LoadSurveyById } from '../survey-result/save-survey-result/save-survey-result-controller-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'

type sutTypes = {
  sut: LoadSurveyResultController
  loadSurveyById: LoadSurveyById
}

const makeSut = (): sutTypes => {
  const loadSurveyById = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyById)
  return {
    sut,
    loadSurveyById
  }
}

describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyById } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyById, 'loadById')
    await sut.handle(mockHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockHttpRequest().params.surveyId)
  })
})
