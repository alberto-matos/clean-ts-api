import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../domain/models/account'
import { DbAuthentication } from './db-authentication'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'

const makeFakeAccount = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'hashed_password'
})

const makeLoadAccountRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountRepositoryStub()
}

const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password'
})

interface SutTypes {
  sut: DbAuthentication
  loadAccountRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = makeLoadAccountRepositoryStub()
  const hashComparerStub = makeHashComparerStub()
  const sut = new DbAuthentication(loadAccountRepositoryStub, hashComparerStub)
  return {
    sut,
    loadAccountRepositoryStub,
    hashComparerStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws exception', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockImplementationOnce(async (email: string): Promise<AccountModel> => {
      return await new Promise((resolve, reject) => {
        reject(new Error('any error'))
      })
    })
    const promise = sut.auth(makeFakeAuthentication())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'load').mockReturnValue(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws exception', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(async (value: string, hash: string): Promise<boolean> => {
      return await new Promise((resolve, reject) => {
        reject(new Error('any error'))
      })
    })
    const promise = sut.auth(makeFakeAuthentication())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns null', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(true)))
    const accessToken = await sut.auth(makeFakeAuthentication())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(accessToken).toBeNull()
  })
})
