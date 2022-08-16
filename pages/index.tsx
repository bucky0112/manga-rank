import { FunctionComponent, useState, useEffect } from 'react'
import { BookCard } from '../components/shared/'
interface books {
  id: number,
  title: string,
  tag1: string,
  tag2: string,
  cover: string,
}

const Home: FunctionComponent = () => {
  const [newBooks, setNewBooks] = useState<books[]>([])

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
  }, [])

  return (
    <main className='max-w-screen-xl mx-auto'>
      <ul className='grid grid-cols-4 gap-8'>
        {newBooks?.map(({ id, title, tag1, tag2, cover }) => (
          <li key={id} className="cursor-pointer">
            <BookCard title={title} tag1={tag1} tag2={tag2} cover={cover} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home
