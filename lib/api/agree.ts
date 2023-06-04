import APIClient from './client'
import { Endpoints } from './endpoints'

const client = new APIClient()

interface Agree {
  pointUuid: string
  userUuid: string
  status: number
}

const agreeAPI = {
  put: (data: Agree, token: string) => {
    const headers = {
      Authorization: token
    }

    return client.post(Endpoints.agree.post, data, headers)
  }
}

export { agreeAPI }
