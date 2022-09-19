import APIClient from "./client";
import { Endpoints } from "./endpoints";

const client = new APIClient();

const manga = {
  getBooks: (count: number) => client.get(Endpoints.Manga.Get, count),
}

export { manga }