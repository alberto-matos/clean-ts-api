import { AccountModel } from '@/domain/models/account'

export type AddAccountParams = Omit<AccountModel, 'id'>

// export type AddAccountParams = {
//   name: string
//   email: string
//   password: string
// }

export interface AddAccount {
  add: (accountValues: AddAccountParams) => Promise<AccountModel>
}
