import { Request } from 'express'
import {
  GetUserChatsService,
  getUserChatsServiceInstance,
} from '../../services/chat/get-user-chats.js'
import { BaseController } from '../../utils/controller-base.js'

export class GetUserChatsController extends BaseController {
  constructor(private readonly getUserChats: GetUserChatsService) {
    super()
  }

  protected extractParams(request: Request) {
    const { user } = request
    return {
      userId: user?.id || '',
    }
  }

  protected async execute(params: any) {
    return this.getUserChats.execute(params)
  }
}

export const getUserChatsControllerInstance = new GetUserChatsController(
  getUserChatsServiceInstance,
)
