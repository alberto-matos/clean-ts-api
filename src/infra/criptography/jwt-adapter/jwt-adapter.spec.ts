import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  },
  verify (): string {
    return 'token_valid'
  }
}))

const makeSut = (): Encrypter => {
  return new JwtAdapter('secretKey')
}

describe('Jwt Adapter', () => {
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
      throw Error('')
    })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
//  test('should call decrypt with correct values', async () => {
//    const sut = makeSut()
//    const verifySpy = await jest.spyOn(jwt, 'verify')
//    await sut.decrypt('any_token', 'secretKey')
//    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secretKey')
//  })
})
