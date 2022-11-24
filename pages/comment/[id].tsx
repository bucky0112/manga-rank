import { useState } from 'react'
import { Navbar } from "../../components"
import { Footer } from '../../components/comment/Footer'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  return (
    <>
      <Navbar setIsOpen={setIsOpenMenu} isOpen={isOpenMenu} />
      <div className="w-full flex border-t-amber-400">
        <div className="">123</div>
        <div className="">456</div>
      </div>
      <Footer />
    </>
  )
}

export default Page