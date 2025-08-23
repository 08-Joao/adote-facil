import { Request, Response } from 'express'
import { Either } from './either.js'

export abstract class BaseController {
  protected abstract execute(params: any): Promise<Either<any, any>>

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const params = this.extractParams(request)
      const result = await this.execute(params)

      const statusCode = result.isFailure() ? 400 : 201
      return response.status(statusCode).json(result.value)
    } catch (err) {
      const error = err as Error
      console.error(`Error in ${this.constructor.name}:`, error)
      return response.status(500).json({ error: error.message })
    }
  }

  protected abstract extractParams(request: Request): any
} 