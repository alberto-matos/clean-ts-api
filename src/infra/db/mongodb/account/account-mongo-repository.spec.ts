import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../main/factories/controllers/signup'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

let accountCollection: Collection
const makeSut = (): AccountMongoRepository => new AccountMongoRepository()

describe('Account Mongo Repository', () => {
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

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(makeFakeAccount())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(makeFakeAccount())
      const account = await sut.loadByEmail('any_email@email.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(makeFakeAccount())
      const account = await sut.loadByEmail('other_email@email.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      let account = (await accountCollection.insertOne(makeFakeAccount())).ops[0]
      const sut = makeSut()
      await sut.updateAccessToken(account._id, 'any_token')
      account = await sut.loadByEmail(account.email)
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })
})
