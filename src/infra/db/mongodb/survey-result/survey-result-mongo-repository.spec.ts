
import { MongoHelper } from './survey-result-mongo-repository-protocols'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { Collection } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '../account/account-mongo-repository-protocols'
import { mockSurvey } from '@/data/test'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

type SutTypes = {
  sut: SurveyResultMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new SurveyResultMongoRepository()
  return {
    sut
  }
}

const makeFakeSurvey = async (): Promise<SurveyModel> => {
  const { id, ...survey } = mockSurvey()
  const res = await surveyCollection.insertOne(survey)
  return res.ops[0]
}

const makeFakeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(
    {
      id: 'any_id',
      name: 'any_name',
      email: 'email@email.com',
      password: 'any_password'
    })
  return res.ops[0]
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeFakeSurvey()
      const account = await makeFakeAccount()
      const { sut } = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })

    test('Should update survey result if its not new', async () => {
      const survey = await makeFakeSurvey()
      const account = await makeFakeAccount()
      const res = await surveyResultCollection.insertOne({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const { sut } = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toEqual(res.ops[0]._id)
      expect(surveyResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
