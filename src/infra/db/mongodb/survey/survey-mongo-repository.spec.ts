import { MongoHelper, AddSurveyModel } from './survey-mongo-repository-protocols'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { Collection } from 'mongodb'

let surveyCollection: Collection

interface SutTypes {
  sut: SurveyMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new SurveyMongoRepository()
  return {
    sut
  }
}

const makeFakeSurvey = (): AddSurveyModel => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }]
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

  test('Should add survey and return null on success', async () => {
    const { sut } = makeSut()
    const addSurvey = await sut.add(makeFakeSurvey())
    const survey = await surveyCollection.findOne({ question: 'any_question' })

    expect(addSurvey).toBeFalsy()
    expect(survey).toBeTruthy()
  })
})
