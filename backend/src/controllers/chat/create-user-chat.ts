import { Request } from 'express'
import {
  CreateUserChatService,
  createUserChatServiceInstance,
} from '../../services/chat/create-user-chat.js'
import { BaseController } from '../../utils/controller-base.js'

export class CreateUserChatController extends BaseController {
  constructor(private readonly createUserChat: CreateUserChatService) {
    super()
  }

  protected extractParams(request: Request) {
    const { userId } = request.body
    const { user } = request
    return {
      user1Id: user?.id || '',
      user2Id: userId,
    }
  }

  protected async execute(params: any) {
    return this.createUserChat.execute(params)
  }
}

export const createUserChatControllerInstance = new CreateUserChatController(
  createUserChatServiceInstance,
)
