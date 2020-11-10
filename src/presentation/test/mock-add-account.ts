import { mockAccountModel } from '@/domain/test'
import { AccountModel, AddAccount, AddAccountParams } from '../controllers/login/signup/signup-controller-protocols'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}
