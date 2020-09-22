import { LogErrorRepository } from '../../../../data/protocols/db/log/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const logCollection = await MongoHelper.getCollection('errors')
    await logCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
