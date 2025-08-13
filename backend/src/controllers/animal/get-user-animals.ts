import { Request } from 'express'
import {
  GetUserAnimalsService,
  getUserAnimalsServiceInstance,
} from '../../services/animal/get-user.js'
import { BaseController } from '../../utils/controller-base.js'

export class GetUserAnimalsController extends BaseController {
  constructor(private readonly getUserAnimals: GetUserAnimalsService) {
    super()
  }

  protected extractParams(request: Request) {
    const { user } = request
    return {
      userId: user?.id || '',
    }
  }

  protected async execute(params: any) {
    return this.getUserAnimals.execute(params)
  }
}

export const getUserAnimalsControllerInstance = new GetUserAnimalsController(
  getUserAnimalsServiceInstance,
)
