import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  accessToken?: string
}

export interface AddAccount {
  add: (accountValues: AddAccountModel) => Promise<AccountModel>
}
