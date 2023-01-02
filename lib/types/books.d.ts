interface bookFromApi {
  uuid: string
  title_cn: string
  tag: string
  image: string
  is_adult: number
  point: string
}

interface bookTag {
  uuid: string
  name: string
}

interface book {
  uuid: string
  title_cn: string
  tag: bookTag[]
  image: string
  is_adult: boolean
  point: string
}

export { bookFromApi, book, bookTag }