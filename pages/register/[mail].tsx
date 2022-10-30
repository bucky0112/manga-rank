import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Footer } from '../../components'
import { Navbar } from '../../components/user'
import { user } from '../../lib/api/user'

const Page = () => {
  const router = useRouter()
  const mail = router.query.mail as string
  const [sec, setSec] = useState<number>(10)
  const [isCounting, setIsCounting] = useState<boolean>(false)

  const verify = async (key: string) => {
    try {
      const { status } = await user.verifyUser(key)
      status === 200 && setIsCounting(true)
    } catch (_) {
      router.push('/404')
    }
  }

  useEffect(() => {
    router?.query?.mail && verify(mail)
  }, [router])

  useEffect(() => {
    if (isCounting) {
      setTimeout(() => {
        setSec(sec - 1)
      }, 1000)
    }

    if (sec === 0) {
      router.push('/')
    }
  }, [isCounting, sec])

  return (
    <>
      <Navbar />
      <main className='flex justify-between w-screen bg-mainBG'>
        <div className='flex flex-col justify-around items-center w-1/2 bg-mainBG font-semibold'>
          <div className='grid justify-center items-center w-159 h-159 rounded-full text-3xl bg-primary'>
            <div>
              <p>註冊成功</p>
              <p className='mt-8 mb-20'>歡迎加入Komic!</p>
              <p>撰寫第一條評論</p>
            </div>
          </div>
          <p className='text-mediumGrey text-xl'>
            <span>{`將在 ${sec} 秒內導回首頁`}</span>
          </p>
        </div>
        <div className='bg-register bg-right h-screen w-1/2 bg-no-repeat'></div>
      </main>
      <Footer />
    </>
  )
}

export default Page
