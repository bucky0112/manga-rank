import APIClient from "./client";
import { Endpoints } from "./endpoints";

const client = new APIClient();

const comment = {
  getComments: (id: string) => client.get(Endpoints.Comment.Get, `${id}/1`),
}

export { comment }
