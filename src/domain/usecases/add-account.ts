import { AccountModel } from '@/domain/models/account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (accountValues: AddAccountModel) => Promise<AccountModel>
}
