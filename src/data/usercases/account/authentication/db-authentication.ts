import { Authentication, AuthenticationModel, LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAccessTokenRepository } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (authentication: AuthenticationModel): Promise<string> {
    let accessToken: string = null
    const account = await this.loadAccountRepository.loadByEmail(authentication.email)
    if (account) {
      if (await this.hashComparer.compare(authentication.password, account.password)) {
        accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
      }
    }
    return accessToken
  }
}
