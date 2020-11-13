
import { MongoHelper } from './survey-result-mongo-repository-protocols'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { Collection, ObjectId } from 'mongodb'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '../account/account-mongo-repository-protocols'
import { mockAccountModel, mockSurveyModel } from '@/domain/test'

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
  const { id, ...survey } = mockSurveyModel()
  const res = await surveyCollection.insertOne(survey)
  return MongoHelper.map(res.ops[0])
}

const makeFakeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAccountModel())
  return MongoHelper.map(res.ops[0])
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
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })

    test('Should update survey result if its not new', async () => {
      const survey = await makeFakeSurvey()
      const account = await makeFakeAccount()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
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
      expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })
  })
})
