import APIClient from "./client";
import { Endpoints } from "./endpoints";

const client = new APIClient();

const manga = {
  getBooks: (count: number) => client.get(Endpoints.Manga.Get, count),
  getDetail: (id: string) => client.get(Endpoints.Manga.Detail, id),
  getNewRelease: (page: number) => client.get(Endpoints.Manga.NewRelease, page),
  getCategory: (id: string, page: string) => client.get(Endpoints.Manga.Category, `${id}/${page}`),
}

export { manga }