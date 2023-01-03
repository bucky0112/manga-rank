import { FunctionComponent, useState } from 'react'
import { ViewContainer } from 'components/index/'
import { Navbar } from 'components/Navbar'
import { Footer } from 'components/Footer'

const Home: FunctionComponent = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  return (
    <>
      <Navbar setIsOpen={setIsOpenMenu} isOpen={isOpenMenu} />
      <ViewContainer isOpen={isOpenMenu} />
      <Footer />
    </>
  )
}

export default Home
