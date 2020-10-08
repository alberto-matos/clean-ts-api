import { AddAccountRepository, AddAccountModel, AccountModel, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository } from './account-mongo-repository-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  private async getAccountCollection (): Promise<Collection> {
    return await MongoHelper.getCollection('accounts')
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const result = await (await this.getAccountCollection()).insertOne(accountData)
    const account = result.ops[0]
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await (await this.getAccountCollection()).findOne({ email })
    return MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await this.getAccountCollection()
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: { accessToken: token }
    })
  }

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const account = await (await this.getAccountCollection()).findOne({ accessToken, role })
    return MongoHelper.map(account)
  }
}
