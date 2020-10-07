import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretKey: string) { }

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secretKey)
  }

  async decrypt (value: string): Promise<string> {
    const verifiedValue: any = jwt.verify(value, this.secretKey)
    return await Promise.resolve(verifiedValue)
  }
}
