import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import jwt from 'jsonwebtoken'
import env from '../config/environments'

let surveyCollection: Collection
let accountCollection: Collection

const insertFakeAccount = async (): Promise<string> => {
  return (await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_pwd'
  })).ops[0]._id
}

const makeAccessToken = async (): Promise<string> => {
  const id = await insertFakeAccount()
  const accessToken = jwt.sign({ id }, env.secretKey)
  await updateFakeAccount(id, accessToken)
  return accessToken
}

const updateFakeAccount = async (id: string, accessToken: string): Promise<void> => {
  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
}

const insertFakeSurvey = async (): Promise<string> => {
  const res = await surveyCollection.insertOne(
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }, {
        answer: 'other_answer'
      }],
      date: new Date()
    }
  )
  return res.ops[0]._id
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({})
        .expect(403)
    })

    test('Should return 200 on save survey result with correct accessToken', async () => {
      const accessToken = await makeAccessToken()
      const surveyId = await insertFakeSurvey()
      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on Load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result with correct accessToken', async () => {
      const accessToken = await makeAccessToken()
      const surveyId = await insertFakeSurvey()
      await request(app)
        .get(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
