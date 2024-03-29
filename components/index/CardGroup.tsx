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
      case 'getHighestRated':
        router.push('/highestRated')
        break
      case 'getTopSell':
        router.push('/topSell')
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
// 鎖定寬度500，更改成icon
  return (
    <>
      <span className='self-start bg-darkGrey text-primary text-[24px] px-6 py-2 rounded-full mt-[63px] font-semibold '>
        {type}
      </span>
      <ul className='grid grid-cols-7 2xl:grid-cols-7 2xl:gap-x-[71px] xl:grid-cols-5 slg:grid-cols-4 ssm:grid-cols-3 ssm:gap-x-[90px] xs:grid-cols-2 xs:gap-x-[87px] xl:gap-x-[84px] slg:gap-x-[45px] gap-y-[60px] mt-[60px]'>
        {showBooks?.map(({ uuid, title_cn, image, tag, is_adult, point }) => (
          <li
            key={uuid}
            className='flex flex-col items-center w-[175px] h-[361px]'
          >
            <BookCard title={title_cn} cover={image} tag={tag} uuid={uuid} isAdult={is_adult} point={point} />
          </li>
        ))}
        <li className='w-[175px] h-[246px]' onClick={handleToLink}>
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
