import { Request } from 'express'
import {
  UpdateUserService,
  updateUserServiceInstance,
} from '../../services/user/update-user.js'
import { BaseController } from '../../utils/controller-base.js'

export class UpdateUserController extends BaseController {
  constructor(private readonly updateUser: UpdateUserService) {
    super()
  }

  protected extractParams(request: Request) {
    const { name, email, password } = request.body
    const { user } = request
    return {
      id: user?.id || '',
      data: { name, email, password },
    }
  }

  protected async execute(params: any) {
    return this.updateUser.execute(params)
  }
}

export const updateUserControllerInstance = new UpdateUserController(
  updateUserServiceInstance,
)
