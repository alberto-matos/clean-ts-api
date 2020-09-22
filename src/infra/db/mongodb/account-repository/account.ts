import { AddAccountRepository, AddAccountModel, AccountModel, LoadAccountByEmailRepository } from './account-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
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
}
