import axios from "axios"

const baseRequest = axios.create({
  baseURL: 'http://manga-rank.herokuapp.com/api/'
})

interface User {
  email: string,
  user_name: string,
  password: string,
  github_auth: string,
  google_auth: string,
}

export const newUser = (data: User) => baseRequest.post("user", { params: data})