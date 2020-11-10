import { mockEncrypter, mockHashComparer, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/test'
import { throwError, mockAuthenticationParams } from '@/domain/test'
import { LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAccessTokenRepository, AccountModel, DbAuthentication } from './db-authentication-protocols'

type SutTypes = {
  sut: DbAuthentication
  loadAccountRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'loadByEmail')
    await sut.auth(mockAuthenticationParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws exception', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'loadByEmail').mockImplementationOnce(async (email: string): Promise<AccountModel> => {
      return await Promise.reject(new Error())
    })
    const promise = sut.auth(mockAuthenticationParams())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountRepositoryStub } = makeSut()
    jest.spyOn(loadAccountRepositoryStub, 'loadByEmail').mockReturnValue(null)
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(mockAuthenticationParams())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws exception', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(async (value: string, hash: string): Promise<boolean> => {
      return await Promise.reject(new Error())
    })
    const promise = sut.auth(mockAuthenticationParams())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationParams())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct #id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthenticationParams())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws exception', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async (value: string): Promise<string> => {
      return await Promise.reject(new Error())
    })
    const promise = sut.auth(mockAuthenticationParams())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(promise).rejects.toThrow()
  })

  test('Should return Encrypter correct accessToken', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe('accessToken')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const generateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthenticationParams())
    expect(generateSpy).toHaveBeenCalledWith('any_id', 'accessToken')
  })

  test('Should throw if UpdateAccessTokenRepository throws exception', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(promise).rejects.toThrow()
  })
})
