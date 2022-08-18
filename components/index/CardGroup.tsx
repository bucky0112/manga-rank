import Image from 'next/image'
import { BookCard } from '../shared'

interface book {
  id: number
  title: string
  tag1: string
  tag2: string
  cover: string
}

interface props {
  showBooks: book[]
  type: string
}

const CardGroup = ({ showBooks, type }: props) => {
  return (
    <>
      <span className='self-start bg-darkGrey text-primary text-[28px] px-6 py-2 rounded-full'>
        {type}
      </span>
      <ul className='grid grid-cols-4 gap-8 mb-20'>
        {showBooks?.map(({ id, title, tag1, tag2, cover }) => (
          <li key={id} className='cursor-pointer'>
            <BookCard title={title} tag1={tag1} tag2={tag2} cover={cover} />
          </li>
        ))}
        <li className='cursor-pointer '>
          <div className='flex flex-col justify-center items-center w-[306px] h-[430px] bg-[#E7E7E7] rounded-3xl'>
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
