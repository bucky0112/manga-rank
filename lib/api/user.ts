import { verify } from 'crypto'
import APIClient from './client'
import { Endpoints } from './endpoints'

const client = new APIClient()

interface User {
  email: string
  github_oauth: string
  google_oauth: string
  password: string
  user_name: string
  nickname: string
}

const user = {
  newUser: (data: User) => client.post(Endpoints.User.NewUser, data),
  verifyUser: (key: string) => client.post(Endpoints.User.Verify, { verifyCode: key }),
}

export { user }
