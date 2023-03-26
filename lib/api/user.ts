import APIClient from './client'
import { Endpoints } from './endpoints'

const client = new APIClient()

interface User {
  email: string
  password: string
  user_name: string
  nickname: string
}

interface LoginData {
  email: string
  password: string
}

const user = {
  newUser: (data: User) => client.post(Endpoints.User.NewUser, data, {}),
  verifyUser: (key: string) => client.post(Endpoints.User.Verify, { verifyCode: key }, {}),
  loginUser: (data: LoginData) => client.post(Endpoints.User.Login, data, {}),
}

export { user }
