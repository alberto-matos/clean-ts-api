import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { AccountModel } from '../../../domain/models/account'
import { DbAuthentication } from './db-authentication'

const makeLoadAccountRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 1,
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
      return await new Promise(resolve => resolve(account))
    }
  }
  return new LoadAccountRepositoryStub()
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const loadAccountRepositoryStub = makeLoadAccountRepositoryStub()
    const sut = new DbAuthentication(loadAccountRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@email.com',
      password: 'any_apssword'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
