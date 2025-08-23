import { Request } from 'express'
import {
  UpdateAnimalStatusService,
  updateAnimalStatusServiceInstance,
} from '../../services/animal/update-animal-status.js'
import { BaseController } from '../../utils/controller-base.js'

export class UpdateAnimalStatusController extends BaseController {
  constructor(private readonly updateAnimalStatus: UpdateAnimalStatusService) {
    super()
  }

  protected extractParams(request: Request) {
    const { status } = request.body
    const { id } = request.params
    const { user } = request
    return {
      id,
      status,
      userId: user?.id || '',
    }
  }

  protected async execute(params: any) {
    return this.updateAnimalStatus.execute(params)
  }
}

export const updateAnimalStatusControllerInstance =
  new UpdateAnimalStatusController(updateAnimalStatusServiceInstance)
