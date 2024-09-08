import { User } from '@prisma/client'

export namespace CreateUserRepositoryDTO {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = User
}
