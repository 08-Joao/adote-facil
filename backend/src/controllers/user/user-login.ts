import { Request } from 'express'
import {
  UserLoginService,
  userLoginServiceInstance,
} from '../../services/user/user-login.js'
import { BaseController } from '../../utils/controller-base.js'

export class UserLoginController extends BaseController {
  constructor(private readonly userLogin: UserLoginService) {
    super()
  }

  protected extractParams(request: Request) {
    const { email, password } = request.body
    return { email, password }
  }

  protected async execute(params: any) {
    return this.userLogin.execute(params)
  }
}

export const userLoginControllerInstance = new UserLoginController(
  userLoginServiceInstance,
)
