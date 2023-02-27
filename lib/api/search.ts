import APIClient from './client'
import { Endpoints } from './endpoints'

const client = new APIClient()

const search = {
  getKeywords: (keywords: string) => client.get(Endpoints.Search.keywords, `${keywords}/1`)
}

export { search }
