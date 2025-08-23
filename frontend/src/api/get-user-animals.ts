import { makeRequest } from '.'

export function getUserAnimals(token: string) {
  return makeRequest({
    url: '/animals/user',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
}
