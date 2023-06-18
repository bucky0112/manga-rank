import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsPencilFill } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'
import { MyComment } from 'components/user'
import { Navbar, Footer } from 'components'
import { SideBar } from 'components/shared'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'

const fakeComments = [
  {
    title: 'Spy Family',
    chapter: '第一話',
    content:
      '上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。...',
    score: 5,
    time: '2021-08-01'
  },
  {
    title: '鏈鋸人',
    chapter: '第一話',
    content:
      '上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。...',
    score: 8,
    time: '2021-08-01'
  }
]

interface comments {
  title: string
  chapter: string
  content: string
  score: number
  time: string
}

const Page = () => {
  const isOpen = useAppSelector(selectSideBarOpen)
  const [comments, setComments] = useState<comments[]>([])

  useEffect(() => {
    setComments(fakeComments)
  }, [])

  return (
    <>
      <Navbar isOpen={isOpen} />
      <main className="relative bg-mainBG font-inter pt-24 pb-2 h-[95vh]">
        <SideBar isOpen={isOpen} />
        <div className='flex flex-col items-center gap-y-1'>
          <Image
            src='https://fakeimg.pl/108x108/'
            layout='fixed'
            width='120'
            height='120'
            alt='user'
            className='rounded-full'
          />
          <p className='flex flex-col items-center my-3'>
            <span className='text-lg font-semibold'>Mary</span>
            <span className='font-medium'>mary1990@gmail.com</span>
          </p>
          <button
            type='button'
            className='flex items-center gap-x-2 border rounded-full py-1 px-6 shadow-2xl'
          >
            <BsPencilFill size='14' />
            <p className='text-sm'>修改個人資訊</p>
          </button>
        </div>
        <div className='w-1280 mx-auto mt-20'>
          <div className='flex items-center justify-between border-b-2 pb-1 mb-4 px-20'>
            <p className='text-lg font-semibold'>我的評論</p>
            <IoSearchOutline className='text-darkGrey' />
          </div>
          {comments.map((comment, index) => (
            <MyComment key={index} {...comment} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Page
