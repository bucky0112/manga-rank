import { useState } from 'react'
import { Footer } from '../../components'
import { Navbar, Main, SignUp } from '../../components/user'

const pages = {
  1: "index",
  2: "signUp"
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState<String>(pages[1])
  return (
    <>
      <Navbar />
      {currentPage === pages[1] ? (
        <Main atClick={setCurrentPage} currentPage={currentPage} />
      ) : (
        <SignUp />
      )}
      <Footer />
    </>
  )
}

export default Page
