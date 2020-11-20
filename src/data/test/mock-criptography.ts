import { Decrypter } from '../protocols/criptography/decrypter'
import { Encrypter } from '../protocols/criptography/encrypter'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { Hasher } from '../protocols/criptography/hasher'
import faker from 'faker'

export class HasherSpy implements Hasher {
  readonly digest = faker.random.uuid()
  plainText: string
  async hash (value: string): Promise<string> {
    this.plainText = value
    return this.digest
  }
}

export class DecrypterSpy implements Decrypter {
  readonly plainText = faker.internet.password()
  token: string
  async decrypt (token: string): Promise<string> {
    this.token = token
    return this.plainText
  }
}

export class EncrypterSpy implements Encrypter {
  readonly cipherText = faker.random.uuid()
  plainText: string

  async encrypt (plainText: string): Promise<string> {
    this.plainText = plainText
    return this.cipherText
  }
}

export class HashComparerSpy implements HashComparer {
  readonly result = true
  plainText: string
  hash: string
  async compare (plainText: string, hash: string): Promise<boolean> {
    this.plainText = plainText
    this.hash = hash
    return this.result
  }
}
