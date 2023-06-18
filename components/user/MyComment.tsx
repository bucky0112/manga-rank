
import { FC } from 'react'
import Image from 'next/image'

interface Props {
  title: string
  chapter: string
  content: string
  score: number
  time: string
}

const MyComment: FC<Props> = ({ title, chapter, content, score, time }) => {
  const starIcon = score > 5 ? '/svg/star.svg' : '/svg/star_grey.svg'

  return (
    <div className='my-8'>
      <div className='flex items-center gap-x-8 mx-10'>
        <div className='relative'>
          <Image
            src={starIcon}
            layout='fixed'
            width={55}
            height={55}
            alt='score'
          />
          <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            {score}
          </span>
        </div>
        <div>
          <p className='flex items-center gap-x-20 mb-4'>
            <span className='font-medium'>{title}</span>
            <span className='font-semibold'>{chapter}</span>
          </p>
          <p>{content}</p>
          <p>{time}</p>
        </div>
      </div>
    </div>
  )
}

export { MyComment }

