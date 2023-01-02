import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BookCard } from 'components/shared'
import { home } from 'lib/api/home'
import { bookFromApi, book } from 'lib/types'
import { listToObj } from 'lib/utils/array'

interface props {
  type: string
  apiName: string
}

const CardGroup = ({ type, apiName }: props) => {
  const [showBooks, setShowBooks] = useState<book[]>([])

  const router = useRouter()

  const handleToLink = () => {
    switch (apiName) {
      case 'getNewRelease':
        router.push('/newRelease')
        break
      default:
        break
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await home[apiName]("index")
        const res = data?.data?.map((item: bookFromApi) => {
          return {
            ...item,
            tag: listToObj(item?.tag?.split(',')?.slice(0, 2)),
            is_adult: item.is_adult === 1
          }
        })
        setShowBooks(res)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <>
      <span className='self-start bg-darkGrey text-primary text-[28px] px-6 py-2 rounded-full mt-16'>
        {type}
      </span>
      <ul className='grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-14 mb-20'>
        {showBooks?.map(({ uuid, title_cn, image, tag, is_adult, point }) => (
          <li
            key={uuid}
            className='justify-self-center flex flex-col justify-center items-center w-77 h-135'
          >
            <BookCard title={title_cn} cover={image} tag={tag} uuid={uuid} isAdult={is_adult} point={point} />
          </li>
        ))}
        <li className='justify-self-center w-77 h-125' onClick={handleToLink}>
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
