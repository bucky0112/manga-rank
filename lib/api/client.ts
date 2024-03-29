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

  verifyGet(path: string, data: any, headers: { [key: string]: string }) {
    return this.client.get(`${path}/${data}`, { headers })
  }

  post(path: string, data: {}, headers: { [key: string]: string }) {
    return this.client.post(path, data, { headers })
  }

  put(path: string, data: {}, headers: { [key: string]: string }) {
    return this.client.put(path, data, { headers })
  }

  delete(path: string, data: {}, headers: { [key: string]: string }) {
    return this.client.delete(path, { data: data, headers: headers })
  }
}

export default APIClient
