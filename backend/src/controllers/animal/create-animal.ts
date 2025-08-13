import { Request } from 'express'
import {
  CreateAnimalService,
  createAnimalServiceInstance,
} from '../../services/animal/create-animal.js'
import { BaseController } from '../../utils/controller-base.js'

export class CreateAnimalController extends BaseController {
  constructor(private readonly createAnimal: CreateAnimalService) {
    super()
  }

  protected extractParams(request: Request) {
    const { name, type, gender, race, description } = request.body
    const { user } = request
    const pictures = request.files as Express.Multer.File[]
    
    return {
      name,
      type,
      gender,
      race,
      description,
      userId: user?.id || '',
      pictures: pictures.map((file) => file.buffer),
    }
  }

  protected async execute(params: any) {
    return this.createAnimal.execute(params)
  }
}

export const createAnimalControllerInstance = new CreateAnimalController(
  createAnimalServiceInstance,
)
