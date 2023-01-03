import { Navbar, Footer, MultipleBooksContainer } from 'components/'
import { home } from 'lib/api/home'
import { useMoreBooks } from 'lib/hooks'

const Page = () => {
  const { showBooks, hasMore, isOpenMenu, setIsOpenMenu, fetchData } =
    useMoreBooks(home.getTopSell)

  return (
    <>
      <Navbar setIsOpen={setIsOpenMenu} isOpen={isOpenMenu} />
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
