import { UserLoginFormData } from '@/app/login/page'
import { makeRequest } from '.'

export function userLogin(data: UserLoginFormData) {
  return makeRequest({
    url: '/login',
    method: 'POST',
    data,
  })
}
