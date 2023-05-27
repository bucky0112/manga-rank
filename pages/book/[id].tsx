import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Navbar, Footer } from 'components'
import { SideBar } from 'components/shared'
import { UserComment, Another, AgeTips } from 'components/book'
import { useAppSelector } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import { manga } from 'lib/api/manga'
import { comment } from 'lib/api/comment'
import { useStorage } from 'lib/hooks'

interface bookDetail {
  author: string
  create_time: string
  description: string
  image: string
  is_adult: number
  publisher: string
  tag: string
  title_cn: string
  point: string
}

interface Comment {
  agree: number
  chapter: string
  description: string
  disagree: number
  isOwn: number
  isThunder: number
  mangaUuid: string
  point: string
  suspect: number
  uuid: string
  nickname: string
}

const Page = () => {
  const router = useRouter()
  const id = router.query.id as string

  const isOpen = useAppSelector(selectSideBarOpen)
  const { storedValue } = useStorage('userInfo', {})
  const token = storedValue?.token || ''

  const [book, setBook] = useState<bookDetail>({} as bookDetail)
  const [comments, setComments] = useState<Comment[]>([])
  const [isAdult, setIsAdult] = useState(false)
  const { author, description, image, is_adult, publisher, title_cn, point } = book

  const fetchDetail = async () => {
    try {
      const { data } = await manga.getDetail(id)
      setBook(data?.data[0])
    } catch (err) {
      console.error(err)
    }
  }

  const fetchComment = async () => {
    try {
      const { data } = await comment.getComments(id, token)
      setComments(data?.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetail()
      fetchComment()
    }
  }, [id])

  useEffect(() => {
    setIsAdult(is_adult === 1)
  }, [book])

  const pointToFixed = (point: string) => {
    const pointToNumber = Number(point)
    if (pointToNumber % 1 !== 0) {
      return pointToNumber.toFixed(2)
    } else {
      return pointToNumber.toFixed(0)
    }
  }

  return (
    <>
      <Navbar isOpen={isOpen} />
      <main className='flex flex-col justify-center items-center px-60 2xl:px-36 xl:px-32 py-52 relative bg-mainBG overflow-x-hidden font-inter'>
        <SideBar isOpen={isOpen} />
        {isAdult && (
          <AgeTips isOpen={isAdult} atClose={() => setIsAdult(false)} />
        )}
        <div className='grid grid-cols-7 xl:grid-cols-3 gap-x-10'>
          <div className='col-span-2 xl:col-span-1'>
            {image && (
              <Image
                src={image}
                layout='intrinsic'
                width='390'
                height='550'
                alt={title_cn}
                className='rounded-3xl object-cover w-[390px] xl:w-[326px] h-[550px] xl:h-[460px]'
              />
            )}
          </div>
          <div className='col-span-3 xl:col-span-1'>
            <h3 className='text-2xl font-semibold mb-5'>{title_cn}</h3>
            <ul className='flex flex-col gap-1 leading-9'>
              <li>
                <p>作者：{author}</p>
              </li>
              <li>
                <p>出版社：{publisher}</p>
              </li>
              <li>
                <p>語言：繁體中文</p>
              </li>
              <li>
                <p className='flex flex-col gap-1 mt-8'>
                  <span>簡介：</span>
                  <span>{description}</span>
                </p>
              </li>
            </ul>
          </div>
          <div className='col-span-2 xl:col-span-1'>
            <div className='flex flex-col p-6 border-t-2 border-r-2 border-darkGrey rounded-r-3xl rounded-b-none text-darkGrey leading-tight'>
              <p className='text-xl'>平均評分</p>
              <p className='text-[12.5rem] xl:text-[10.5rem] self-end'>{pointToFixed(point)}</p>
              <p className='self-end text-lg'>/300人</p>
            </div>
          </div>
        </div>
        <div
          className='right-2 top-[600px] cursor-pointer fixed'
          onClick={() => router.push(`/comment/${id}`)}
        >
          <div className='relative grid grid-rows-3'>
            <div className='row-span-full w-36 h-36'>
              <Image
                src='/svg/explode.svg'
                layout='fixed'
                width='144'
                height='144'
                alt='common button'
              />
            </div>
            <div className='absolute row-start-2 row-end-3 justify-self-center -mt-2'>
              <Image
                src='/svg/pen.svg'
                width='40'
                height='57'
                layout='intrinsic'
                alt='common'
              />
            </div>
            <div className='absolute row-start-3 row-end-4 justify-self-center -mt-2'>
              <p className='text-darkGrey text-sm'>我要評論</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-20 mt-36 mb-32 w-full'>
          {comments?.map((comment) => (
            <UserComment key={comment.uuid} state={{ ...comment, bookTitle: title_cn }} />
          ))}
        </div>
        <Another />
      </main>
      <Footer />
    </>
  )
}

export default Page
