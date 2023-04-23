import { useState } from 'react'
import { Footer } from 'components'
import { Navbar, Main, SignUp } from 'components/user'

const Page = () => {
  const [currentPage, setCurrentPage] = useState<string>('main')
  const pages: Record<string, JSX.Element> = {
    main: <Main atClick={setCurrentPage} currentPage={currentPage} />,
    signUp: <SignUp setCurrentPage={setCurrentPage} />
  }
  return (
    <>
      <Navbar />
      {pages[currentPage]}
      <Footer />
    </>
  )
}

export default Page
