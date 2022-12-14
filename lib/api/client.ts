import axios from 'axios'

class APIClient {
  client: any
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  get(path: string, data: any) {
    return this.client.get(`${path}/${data}`)
  }

  post(path: string, data: {}) {
    return this.client.post(path, data)
  }
}

export default APIClient
