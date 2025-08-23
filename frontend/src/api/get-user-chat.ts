import { makeRequest } from '.'

export function getUserChat(token: string, chatId: string) {
  return makeRequest({
    url: `/users/chats/${chatId}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
}
