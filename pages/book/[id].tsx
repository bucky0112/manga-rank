import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { UserComment } from '../../components/book'
import { manga } from '../../lib/api/manga'

interface bookDetail {
  author: string
  create_time: string
  description: string
  image: string
  is_adult: number
  publisher: string
  tag: string
  title_cn: string
}

const Page = () => {
  const router = useRouter()
  const id = router.query.id as string

  const [book, setBook] = useState<bookDetail>({} as bookDetail)
  const {
    author,
    create_time,
    description,
    image,
    is_adult,
    publisher,
    tag,
    title_cn
  } = book

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await manga.getDetail(id)
        setBook(data?.data[0])
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <main className='px-60 py-52'>
      <div className='grid grid-cols-7 gap-x-10'>
        <div className='col-span-2'>
          {image && (
            <Image
              src={image}
              layout='intrinsic'
              width='390'
              height='550'
              alt={title_cn}
              className='rounded-3xl object-cover'
            />
          )}
        </div>
        <div className='col-span-3'>
          <h3 className='text-2xl font-semibold mb-5'>{title_cn}</h3>
          <ul className='flex flex-col gap-1 leading-9'>
            <li>
              <p>作者：{author}</p>
            </li>
            <li>
              <p>譯者：xxx</p>
            </li>
            <li>
              <p>出版社：{publisher}</p>
            </li>
            <li>
              <p className='flex flex-col gap-1'>
                <span>最新出版日期：</span>
                <span>xxxx/xx/xx</span>
              </p>
            </li>
            <li>
              <p>語言：繁體中文</p>
            </li>
            <li>
              <p>定價：xxx元/本</p>
            </li>
            <li>
              <p className='flex flex-col gap-1 mt-8'>
                <span>簡介：</span>
                <span>{description}</span>
              </p>
            </li>
          </ul>
        </div>
        <div className='col-span-2'>
          <div className='flex flex-col p-6 border-t-2 border-r-2 border-darkGrey rounded-r-3xl rounded-b-none text-darkGrey leading-tight'>
            <p className='text-xl'>平均評分</p>
            <p className='text-[12rem] self-end'>5.9</p>
            <p className='self-end'>/300人</p>
          </div>
        </div>
      </div>
      {/* <div>
        <UserComment />
      </div> */}
    </main>
  )
}

export default Page
