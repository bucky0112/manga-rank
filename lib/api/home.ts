import APIClient from "./client";
import { Endpoints } from "./endpoints";

const client = new APIClient();

const home = {
  getNewRelease: (page: string) => client.get(Endpoints.Home.NewRelease, page),
}

export { home }