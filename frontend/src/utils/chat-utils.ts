import { Chat } from '@/@types/chat'
import { UserData } from '@/@types/user-data'

export class ChatUtils {
  static getReceiverId(chat: Chat, currentUserId: string): string {
    if (!chat || !currentUserId) {
      throw new Error('Chat ou usuário atual não fornecido')
    }

    return chat.user1.id === currentUserId ? chat.user2.id : chat.user1.id
  }

  static getReceiverName(chat: Chat, currentUserId: string): string {
    if (!chat || !currentUserId) {
      return ''
    }

    return chat.user1.id === currentUserId ? chat.user2.name : chat.user1.name
  }

  static isUserMessage(messageSenderId: string, currentUserId: string): boolean {
    return messageSenderId === currentUserId
  }
} 