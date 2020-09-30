import { DbAddAccount, BcryptAdapter, AccountMongoRepository } from '.'
import env from '../../../config/env'

export const makeAddAccount = (): DbAddAccount => {
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
