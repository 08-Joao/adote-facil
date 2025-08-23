import { Request } from 'express'
import {
  CreateUserService,
  createUserServiceInstance,
} from '../../services/user/create-user.js'
import { BaseController } from '../../utils/controller-base.js'

export class CreateUserController extends BaseController {
  constructor(private readonly createUser: CreateUserService) {
    super()
  }

  protected extractParams(request: Request) {
    const { name, email, password } = request.body
    return { name, email, password }
  }

  protected async execute(params: any) {
    return this.createUser.execute(params)
  }
}

export const createUserControllerInstance = new CreateUserController(
  createUserServiceInstance,
)
