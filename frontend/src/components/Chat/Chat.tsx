/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowFatLinesRight, ArrowLeft } from '@phosphor-icons/react'
import * as S from './Chat.styles'
import { UserData } from '@/@types/user-data'
import { Chat } from '@/@types/chat'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getCookie } from 'cookies-next'
import { getUserChat } from '@/api/get-user-chat'
import { format } from 'date-fns'
import { sendChatMessage } from '@/api/send-chat-message'
import { ChatUtils } from '@/utils/chat-utils'

interface ChatProps {
  chatId: string
  userData: UserData | null
  handleReturnToChatsListClick(): void
}

export function ChatComponent({
  chatId,
  userData,
  handleReturnToChatsListClick,
}: ChatProps) {
  const [chat, setChat] = useState<Chat | null>(null)
  const messageListRef = useRef<HTMLDivElement | null>(null)

  const fetchUserChat = useCallback(async () => {
    const token = getCookie('token')

    const response = await getUserChat(token || '', chatId)

    if (response.status === 200) {
      setChat(response.data)
    }
  }, [chatId])

  useEffect(() => {
    fetchUserChat()
  }, [fetchUserChat])

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [chat])

  const handleSendMessage = async (e: any) => {
    e.preventDefault()

    const messageToSend = e.target[0].value

    if (!messageToSend || !chat || !userData) {
      return
    }

    const token = getCookie('token')
    const receiverId = ChatUtils.getReceiverId(chat, userData.id)

    try {
      const response = await sendChatMessage(token || '', {
        receiverId,
        content: messageToSend,
      })

      if (response.status === 201) {
        fetchUserChat()
        e.target[0].value = ''
      } else {
        alert(
          response.data.message ||
            'Erro ao enviar a mensagem. Tente novamente.',
        )
      }
    } catch (err) {
      const error = err as Error
      console.error('Erro ao enviar a mensagem:', error)
      alert(error.message || 'Erro ao enviar a mensagem. Tente novamente.')
    }
  }

  return (
    <S.Wrapper>
      <S.ChatHeader>
        <S.GoBackButton onClick={handleReturnToChatsListClick}>
          <ArrowLeft size={32} />
        </S.GoBackButton>

        <span>
          {chat ? ChatUtils.getReceiverName(chat, userData?.id || '') : ''}
        </span>
      </S.ChatHeader>

      <S.ChatMessageList ref={messageListRef}>
        {chat?.messages.map((message) => (
          <S.ChatMessageWrapper
            key={message.id}
            $isUserMessage={ChatUtils.isUserMessage(message.senderId, userData?.id || '')}
          >
            <S.ChatMessage $isUserMessage={ChatUtils.isUserMessage(message.senderId, userData?.id || '')}>
              <span>{message.content}</span>
              <span>
                {format(new Date(message.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </span>
            </S.ChatMessage>
          </S.ChatMessageWrapper>
        ))}
      </S.ChatMessageList>

      <S.ChatSendMessageForm onSubmit={handleSendMessage}>
        <S.ChatSendMessageInput
          type="input"
          placeholder="Digite sua mensagem"
        />

        <S.ChatSendMessageButton>
          <ArrowFatLinesRight size={32} />
        </S.ChatSendMessageButton>
      </S.ChatSendMessageForm>
    </S.Wrapper>
  )
}
