import { MongoHelper, AddSurveyParams } from './survey-mongo-repository-protocols'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { Collection } from 'mongodb'

let surveyCollection: Collection

type SutTypes = {
  sut: SurveyMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new SurveyMongoRepository()
  return {
    sut
  }
}

const makeFakeSurvey = (): AddSurveyParams => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  }
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
  })

  describe('add()', () => {
    test('Should add survey and return null on success', async () => {
      const { sut } = makeSut()
      const addSurvey = await sut.add(makeFakeSurvey())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(addSurvey).toBeFalsy()
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([makeFakeSurvey()])
      await surveyCollection.insertMany([makeFakeSurvey()])
      const { sut } = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
    })

    test('Should load empty list', async () => {
      const { sut } = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load by id on success', async () => {
      const surveyFakeInsert = makeFakeSurvey()
      const surveyData = makeFakeSurvey()
      const res = await surveyCollection.insertOne(surveyFakeInsert)
      const { sut } = makeSut()
      const id = res.ops[0]._id
      const survey = await sut.loadById(id)
      expect(survey).toEqual(Object.assign({}, surveyData, { id }))
    })
  })
})
