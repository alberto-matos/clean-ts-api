import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  },
  verify (): string {
    return 'valid_token'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secretKey')
}

describe('Jwt Adapter', () => {
  describe('sing()', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secretKey')
    })
    test('Should return an AccessToken on sign succeed', async () => {
      const sut = makeSut()
      const token = await sut.encrypt('any_value')
      expect(token).toBe('any_token')
    })
    test('Should throw if sign throws exception', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error('')
      })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify()', () => {
    test('should call decrypt with correct values', async () => {
      const sut = makeSut()
      const verifySpy = await jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secretKey')
    })
    test('should return value on verify success', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify')
      const value = await sut.decrypt('any_token')
      expect(value).toBe('valid_token')
    })
    test('should throw verify throws exception', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('')
      })
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
