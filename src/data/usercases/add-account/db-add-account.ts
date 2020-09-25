import { LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'
import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const accountMerge = Object.assign({}, accountData, { password: hashedPassword })
    const account = await this.addAccountRepository.add(accountMerge)
    return account
  }
}
