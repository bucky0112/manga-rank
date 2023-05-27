import APIClient from './client'
import { Endpoints } from './endpoints'

const client = new APIClient()

interface Comment {
  chapter: string
  description: string
  isThunder: number
  mangaUuid: string
  point: number
}

interface UpdateComment {
  uuid: string
  chapter: string
  point: number
  description: string
  isThunder: number
}

const comment = {
  getComments: (id: string, token: string) => {
    const headers = {
      Authorization: token
    }
    if (token) {
      return client.verifyGet(Endpoints.Comment.Get, `${id}/1`, headers)
    } else {
      return client.get(Endpoints.Comment.Get, `${id}/1`)
    }
  },
  new: (data: Comment, token: string) => {
    const headers = {
      Authorization: token
    }
    return client.post(Endpoints.Comment.New, data, headers)
  },
  update: (data: UpdateComment, token: string) => {
    const headers = {
      Authorization: token
    }
    return client.put(Endpoints.Comment.Put, data, headers)
  },
  delete: (id: string, token: string) => {
    const headers = {
      Authorization: token
    }
    const data = {
      uuid: id
    }
    return client.delete(Endpoints.Comment.Delete, data, headers)
  }
}

export { comment }
