import APIClient from "./client";
import { Endpoints } from "./endpoints";

interface HomeAPI {
  [key: string]: (page: string) => Promise<any>
}

const client = new APIClient();

const home: HomeAPI = {
  getNewRelease: (page: string) => client.get(Endpoints.Home.NewRelease, page),
  getHighestRated: (page: string) => client.get(Endpoints.Home.HighestRated, page),
  getTopSell: (page: string) => client.get(Endpoints.Home.TopSell, page),
}

export { home }