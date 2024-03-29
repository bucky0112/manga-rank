import { Navbar, Footer, MultipleBooksContainer } from 'components/'
import { home } from 'lib/api/home'
import { useMoreBooks } from 'lib/hooks'

const Page = () => {
  const { showBooks, hasMore, isOpenMenu, fetchData } =
    useMoreBooks(home.getTopSell)

  return (
    <>
      <Navbar isOpen={isOpenMenu} />
      <MultipleBooksContainer
        type='各書店平台週冠軍'
        isOpen={isOpenMenu}
        showBooks={showBooks}
        fetchData={fetchData}
        hasMore={hasMore}
      />
      <Footer />
    </>
  )
}

export default Page
