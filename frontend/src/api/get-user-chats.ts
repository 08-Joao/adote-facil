import { makeRequest } from '.'

export function getUserChats(token: string) {
  return makeRequest({
    url: '/users/chats',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
}
