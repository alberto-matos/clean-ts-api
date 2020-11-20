import { EncrypterSpy, HashComparerSpy, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/test'
import { throwError, mockAuthenticationParams, mockAccountModel } from '@/domain/test'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository, AccountModel, DbAuthentication } from './db-authentication-protocols'

type SutTypes = {
  sut: DbAuthentication
  loadAccountRepositoryStub: LoadAccountByEmailRepository
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountRepositoryStub, hashComparerSpy, encrypterSpy, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountRepositoryStub,
    hashComparerSpy,
    encrypterSpy,
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
    const { sut, hashComparerSpy } = makeSut()
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(hashComparerSpy.plainText).toBe(params.password)
    expect(hashComparerSpy.hash).toBe(mockAccountModel().password)
  })

  test('Should throw if HashComparer throws exception', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationParams())
    await expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct #id', async () => {
    const { sut, encrypterSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(encrypterSpy.plainText).toBe('any_id')
  })

  test('Should throw if Encrypter throws exception', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Encrypter correct accessToken', async () => {
    const { sut, encrypterSpy } = makeSut()
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe(encrypterSpy.cipherText)
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub, encrypterSpy } = makeSut()
    const generateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthenticationParams())
    expect(generateSpy).toHaveBeenCalledWith(encrypterSpy.plainText, encrypterSpy.cipherText)
  })

  test('Should throw if UpdateAccessTokenRepository throws exception', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await expect(promise).rejects.toThrow()
  })
})
