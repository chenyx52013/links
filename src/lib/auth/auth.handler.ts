import { Auth } from '@auth/core'
import authConfig from './auth.config'

export async function authHandler(req: Request, res: Response) {
  return await Auth(req, res, authConfig)
}