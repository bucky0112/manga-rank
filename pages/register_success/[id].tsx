import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Footer } from '../../components'
import { Navbar } from '../../components/user/'

const Page = () => {
  const router = useRouter()
  const [mail, setMail] = useState<string>('')

  useEffect(() => {
    if (router.query.id) {
      setMail(router.query.id as string)
    }
  }, [router])

  return (
    <>
      <Navbar />
      <main className='flex justify-between w-screen bg-mainBG'>
        <div className='flex flex-col justify-around items-center w-1/2 bg-mainBG font-semibold'>
          <div className='grid justify-center items-center w-159 h-159 rounded-full bg-lightGrey text-3xl'>
            <div>
              <p>我們已發註冊信到</p>
              <p className='mt-8 mb-20'>{mail}</p>
              <p>請到email查收 ：）</p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 text-mediumGrey text-xl'>
            <p className='flex flex-col'>
              <span>若五分鐘內沒有收到信件，</span>
              <span>請更改信箱或重新寄出信件。</span>
            </p>
            <button
              type='button'
              className='bg-lightGrey w-32 h-14 rounded-full'
            >
              更改信箱
            </button>
            <button
              type='button'
              className='bg-lightGrey w-32 h-14 rounded-full'
            >
              重新寄出
            </button>
          </div>
        </div>
        <div className='bg-register bg-right h-screen w-1/2 bg-no-repeat'></div>
      </main>
      <Footer />
    </>
  )
}

export default Page
