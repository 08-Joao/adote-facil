import { CreateUserFormData } from '@/app/cadastro/page'
import { makeRequest } from '.'

export async function registerUser(data: CreateUserFormData) {
  return makeRequest({
    url: '/users',
    method: 'POST',
    data,
  })
}
