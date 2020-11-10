import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { mockSaveSurveyResultRepository } from '@/data/test'
import { throwError, mockSurveyResultParams, mockSurveyResultModel } from '@/domain/test'
import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}
describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should calls SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(mockSurveyResultParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSurveyResultParams())
  })

  test('Should throw if SaveSurveyRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    // eslint-disable-next-line promise/param-names
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a Survey on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.save(mockSurveyResultParams())
    expect(httpResponse).toEqual(mockSurveyResultModel())
  })
})
