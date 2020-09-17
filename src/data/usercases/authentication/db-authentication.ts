import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountRepository: LoadAccountByEmailRepository

  constructor (loadAccountRepository: LoadAccountByEmailRepository) {
    this.loadAccountRepository = loadAccountRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountRepository.load(authentication.email)
    return null
  }
}
