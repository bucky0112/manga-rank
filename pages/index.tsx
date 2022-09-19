import { FunctionComponent } from 'react'
import { ViewContainer } from '../components/index/'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

const Home: FunctionComponent = () => {

  return (
    <>
      <Navbar />
      <ViewContainer />
      <Footer />
    </>
  )
}

export default Home
