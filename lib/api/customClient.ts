import axios from 'axios'

class APIClient {
  client: any
  constructor(customUrl: string) {
    this.client = axios.create({
      baseURL: customUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  get(path: string, data: any) {
    return this.client.get(`${path}/${data}`)
  }

  post(path: string, data: any) {
    return this.client.post(path, data)
  }
}

export default APIClient
