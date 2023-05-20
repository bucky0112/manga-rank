import APIClient from "./client";
import { Endpoints } from "./endpoints";

const client = new APIClient();

interface Comment {
  chapter: string
  description: string
  isThunder: number
  mangaUuid: string
  point: number
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
};

export { comment }
