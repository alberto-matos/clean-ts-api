import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../protocols/criptography/token-generator'
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, tokenGenerator: TokenGenerator, updateAccessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountRepository = loadAccountRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    let accessToken: string = null
    const account = await this.loadAccountRepository.load(authentication.email)
    if (account) {
      if (await this.hashComparer.compare(authentication.password, account.password)) {
        accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
      }
    }
    return accessToken
  }
}
