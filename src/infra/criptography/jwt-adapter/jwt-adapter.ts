import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  private readonly secretKey: string

  constructor (secretKey: string) {
    this.secretKey = secretKey
  }

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secretKey)
  }
}
