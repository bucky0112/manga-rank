import axios from "axios"

const baseRequest = axios.create({
  baseURL: 'https://x4cczk9r43.execute-api.ap-south-1.amazonaws.com/v1/'
})

interface User {
  email: string,
  user_name: string,
  password: string,
  github_auth: string,
  google_auth: string,
}

export const newUser = (data: User) => baseRequest.post("user", data)