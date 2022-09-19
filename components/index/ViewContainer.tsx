import { useState, useEffect } from 'react'
import { CardGroup } from './CardGroup'
import { manga } from '../../lib/api/manga'

interface books {
  id: number
  title: string
  tag1: string
  tag2: string
  cover: string
}

const ViewContainer = () => {
  const [newBooks, setNewBooks] = useState<books[]>([])
  const [showBooks, setShowBooks] = useState<books[]>([])

  useEffect(() => {
    setNewBooks(
      Array.from({ length: 10 }).map((item, i) => {
        return {
          id: i,
          title: '間諜家家酒',
          tag1: '喜劇',
          tag2: '推特話題',
          cover: 'https://fakeimg.pl/306x430/'
        }
      })
    )
    ;(async () => {
      const res = await manga.getBooks(10)
      console.log(res)
    })()
  }, [])

  useEffect(() => {
    setShowBooks(newBooks.slice(0, 7))
  }, [newBooks])
  return (
    <main className='flex flex-col justify-center gap-10 p-10 bg-index bg-fixed bg-[length:300px] bg-no-repeat'>
      <CardGroup showBooks={showBooks} type='最新發行' />
      <CardGroup showBooks={showBooks} type='評價超過8分的作品' />
      <CardGroup showBooks={showBooks} type='各書店平台週冠軍' />
    </main>
  )
}

export { ViewContainer }
