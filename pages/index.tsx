import { FunctionComponent } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import { ViewContainer } from 'components/index/'
import { Navbar } from 'components/Navbar'
import { Footer } from 'components/Footer'

const Home: FunctionComponent = () => {
  const isOpen = useAppSelector(selectSideBarOpen)

  return (
    <>
      <Navbar isOpen={isOpen} />
      <ViewContainer isOpen={isOpen} />
      <Footer />
    </>
  )
}

export default Home
