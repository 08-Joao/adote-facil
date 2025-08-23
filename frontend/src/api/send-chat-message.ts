import { makeRequest } from '.'

type SendMessageData = {
  receiverId: string
  content: string
}

export function sendChatMessage(token: string, data: SendMessageData) {
  return makeRequest({
    url: '/users/chats/messages',
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    data,
  })
}
