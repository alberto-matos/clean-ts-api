import { LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import { AccountMongoRepository } from '../add-account'
import { DbLoadAccountByToken } from '../../../../../data/usercases/load-account-by-token/db-load-account-by-token'
import env from '../../../../config/environments'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.secretKey)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
