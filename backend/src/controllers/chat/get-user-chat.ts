import { Request } from 'express'
import {
  GetUserChatService,
  getUserChatServiceInstance,
} from '../../services/chat/get-user-chat.js'
import { BaseController } from '../../utils/controller-base.js'

export class GetUserChatController extends BaseController {
  constructor(private readonly getUserChat: GetUserChatService) {
    super()
  }

  protected extractParams(request: Request) {
    const { chatId } = request.params
    const { user } = request
    return {
      userId: user?.id || '',
      chatId,
    }
  }

  protected async execute(params: any) {
    return this.getUserChat.execute(params)
  }
}

export const getUserChatControllerInstance = new GetUserChatController(
  getUserChatServiceInstance,
)
