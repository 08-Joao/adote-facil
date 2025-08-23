import { makeRequest } from '.'

export async function insertUserChat(userId: string, token: string) {
  return makeRequest({
    url: '/users/chats',
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data: { userId },
  })
}
