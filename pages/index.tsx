import Head from 'next/head'
import { useAppSelector } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import { Navbar, Footer } from 'components'
import { ViewContainer } from 'components/index/'

const Home = () => {
  const isOpen = useAppSelector(selectSideBarOpen)

  return (
    <>
      <Head>
        <title>Komic</title>
        <meta property="og:title" content="Komic" />
        <meta property="og:description" content="最多元的漫畫評論都在漫畫嗑" />
        <meta property="og:image" content="https://i.imgur.com/TCOUZW1.jpg" />
        <meta property="og:url" content="https://loquacious-wisp-cab900.netlify.app/" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Komic" />
        <meta name="twitter:description" content="最多元的漫畫評論都在漫畫嗑" />
        <meta name="twitter:image" content="https://loquacious-wisp-cab900.netlify.app/" />
      </Head>
      <Navbar isOpen={isOpen} />
      <ViewContainer isOpen={isOpen} />
      <Footer />
    </>
  )
}

export default Home
