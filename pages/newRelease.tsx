import { Navbar, Footer, MultipleBooksContainer } from 'components/'
import { home } from 'lib/api/home'
import { useMoreBooks } from 'lib/hooks'

const Page = () => {
  const { showBooks, hasMore, isOpenMenu, fetchData } = useMoreBooks(home.getNewRelease)

  return (
    <>
      <Navbar isOpen={isOpenMenu} />
      <MultipleBooksContainer type='最新發行' isOpen={isOpenMenu} showBooks={showBooks} fetchData={fetchData} hasMore={hasMore} />
      <Footer />
    </>
  )
}

export default Page
