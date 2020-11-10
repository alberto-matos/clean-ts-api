import { Collection } from 'mongodb'
import { mockAccountModel } from '@/domain/test'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

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
      const account = await sut.add(mockAccountModel())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('hashed_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAccountModel())
      const account = await sut.loadByEmail('any_email@email.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('hashed_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAccountModel())
      const account = await sut.loadByEmail('other_email@email.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      let account = (await accountCollection.insertOne(mockAccountModel())).ops[0]
      const sut = makeSut()
      await sut.updateAccessToken(account._id, 'any_token')
      account = await sut.loadByEmail(account.email)
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...mockAccountModel(), accessToken: 'any_token' })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('hashed_password')
    })
    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...mockAccountModel(), accessToken: 'any_token', role: 'admin' })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('hashed_password')
    })
    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...mockAccountModel(), accessToken: 'any_token' })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeNull()
    })
    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...mockAccountModel(), accessToken: 'any_token', role: 'admin' })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('hashed_password')
    })
    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...mockAccountModel(), accessToken: 'any_token' })
      const account = await sut.loadByToken('other_token')
      expect(account).toBeNull()
    })
  })
})
