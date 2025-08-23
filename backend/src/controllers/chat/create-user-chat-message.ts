import { Request } from 'express'
import {
  CreateUserChatMessageService,
  createUserChatMessageServiceInstance,
} from '../../services/chat/create-user-chat-message.js'
import { BaseController } from '../../utils/controller-base.js'

export class CreateUserChatMessageController extends BaseController {
  constructor(
    private readonly createUserChatMessage: CreateUserChatMessageService,
  ) {
    super()
  }

  protected extractParams(request: Request) {
    const { receiverId, content } = request.body
    const { user } = request
    return {
      senderId: user?.id || '',
      receiverId,
      content,
    }
  }

  protected async execute(params: any) {
    return this.createUserChatMessage.execute(params)
  }
}

export const createUserChatMessageControllerInstance =
  new CreateUserChatMessageController(createUserChatMessageServiceInstance)
