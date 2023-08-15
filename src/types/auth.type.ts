import { User } from './user.type'
import { Response } from './utils.type'

export type AuthResponse = Response<{
  access_token: string
  expires: string
  user: User
}>
