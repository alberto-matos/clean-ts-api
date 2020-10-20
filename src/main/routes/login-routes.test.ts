import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
const salt = 12

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Alberto',
          email: 'alberto@email.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const passwordHashed = await hash('123', salt)
      await accountCollection.insertOne({
        name: 'Alberto',
        email: 'alberto@email.com',
        password: passwordHashed
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'alberto@email.com',
          password: '123'
        })
        .expect(200)
    })
    test('Should return 401 if password wronged', async () => {
      const passwordHashed = await hash('321', salt)
      await accountCollection.insertOne({
        name: 'Alberto',
        email: 'alberto@email.com',
        password: passwordHashed
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'alberto@email.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
