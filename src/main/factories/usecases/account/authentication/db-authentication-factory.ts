import { DbAuthentication } from '@/data/usercases/account/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '@/main/config/environments'

export const makeAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcryptAdapter(env.salt)
  const jwtAdapter = new JwtAdapter(env.secretKey)
  return new DbAuthentication(accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository)
}
