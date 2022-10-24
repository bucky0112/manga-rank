import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BookCard } from '../shared'
import { manga } from '../../lib/api/manga'

interface book {
  uuid: string
  title_cn: string
  // tag1: string
  // tag2: string
  image: string
}

interface props {
  // showBooks: book[]
  type: string
}

const CardGroup = ({
  // showBooks,
  type }: props) => {
  const [showBooks, setShowBooks] = useState<book[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await manga.getBooks(10)
        const res = data?.data?.slice(0, 7)
        setShowBooks(res)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])
  
  return (
    <>
      <span className='self-start bg-darkGrey text-primary text-[28px] px-6 py-2 rounded-full'>
        {type}
      </span>
      <ul className='grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-8 mb-20'>
        {showBooks?.map(({ uuid, title_cn, image }) => (
          <li
            key={uuid}
            className='justify-self-center flex flex-col justify-center items-center w-77 h-135'
          >
            <BookCard title={title_cn} cover={image} />
          </li>
        ))}
        <li className='justify-self-center w-77 h-125'>
          <div className='flex flex-col justify-center items-center bg-[#E7E7E7] rounded-3xl w-full h-full cursor-pointer'>
            <Image
              src='/svg/right_arrow.svg'
              layout='fixed'
              height='88'
              width='51'
              alt='more'
            />
          </div>
        </li>
      </ul>
    </>
  )
}

export { CardGroup }
