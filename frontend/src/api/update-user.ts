import { UpdateUserInfoFormData } from '@/components/UpdateUserInfoForm'
import { makeRequest } from '.'

export async function updateUser(data: UpdateUserInfoFormData, token?: string) {
  return makeRequest({
    url: '/users',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: data.name !== '' ? data.name : undefined,
      email: data.email !== '' ? data.email : undefined,
      password: data.password !== '' ? data.password : undefined,
    },
  })
}
