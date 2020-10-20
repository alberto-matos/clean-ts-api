import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
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
    password: 'any_pwd',
    role: 'admin'
  })).ops[0]._id
}

const updateFakeAccount = async (id: string, accessToken: string): Promise<void> => {
  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [
            {
              image: 'http://image-name.jpg',
              answer: 'any_answer'
            }, {
              answer: 'other_answer'
            }
          ]
        })
        .expect(403)
    })
    test('Should return 204 on add survey with valid accessToken', async () => {
      const id = await insertFakeAccount()
      const accessToken = jwt.sign({ id }, env.secretKey)
      await updateFakeAccount(id, accessToken)
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            {
              image: 'http://image-name.jpg',
              answer: 'any_answer'
            }, {
              answer: 'other_answer'
            }
          ]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
  })
})
