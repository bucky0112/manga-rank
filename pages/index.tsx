import { FunctionComponent } from 'react'
import { useAppSelector } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import { Navbar, Footer } from 'components'
import { ViewContainer } from 'components/index/'

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
