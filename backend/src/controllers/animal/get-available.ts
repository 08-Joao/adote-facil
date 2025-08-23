import { Request } from 'express'
import {
  GetAvailableAnimalsService,
  getAvailableAnimalsServiceInstance,
} from '../../services/animal/get-available.js'
import { BaseController } from '../../utils/controller-base.js'

export class GetAvailableAnimalsController extends BaseController {
  constructor(
    private readonly getAvailableAnimals: GetAvailableAnimalsService,
  ) {
    super()
  }

  protected extractParams(request: Request) {
    const { user } = request
    const { gender, type, name } = request.query
    return {
      userId: user?.id || '',
      gender: gender ? String(gender) : undefined,
      type: type ? String(type) : undefined,
      name: name ? String(name) : undefined,
    }
  }

  protected async execute(params: any) {
    return this.getAvailableAnimals.execute(params)
  }
}

export const getAvailableAnimalsControllerInstance =
  new GetAvailableAnimalsController(getAvailableAnimalsServiceInstance)
