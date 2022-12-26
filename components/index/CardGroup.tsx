// import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BookCard } from '../shared'
// import { manga } from '../../lib/api/manga'

interface bookFromApi {
  uuid: string
  title_cn: string
  tag: string
  image: string
  is_adult: number
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
}

interface props {
  type: string
  state: book[]
}

const listToObj = (list: string[]) => {
  return list?.map((item: string) => {
    const [uuid, name] = item.split('§')
    return {
      uuid,
      name
    }
  })
}

const CardGroup = ({ type, state }: props) => {
  // const [showBooks, setShowBooks] = useState<book[]>([])

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const { data } = await manga.getBooks(10)
  //       const res = data?.data?.slice(0, 7).map((item: bookFromApi) => {
  //         return {
  //           ...item,
  //           tag: listToObj(item?.tag?.split(',')?.slice(0, 2)),
  //           is_adult: item.is_adult === 1
  //         }
  //       })
  //       setShowBooks(res)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   })()
  // }, [])

  return (
    <>
      <span className='self-start bg-darkGrey text-primary text-[28px] px-6 py-2 rounded-full'>
        {type}
      </span>
      <ul className='grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-14 mb-20'>
        {state?.map(({ uuid, title_cn, image, tag, is_adult }) => (
          <li
            key={uuid}
            className='justify-self-center flex flex-col justify-center items-center w-77 h-135'
          >
            <BookCard title={title_cn} cover={image} tag={tag} uuid={uuid} isAdult={is_adult} />
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
