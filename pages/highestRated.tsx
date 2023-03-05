import { Navbar, Footer, MultipleBooksContainer } from 'components/'
import { home } from 'lib/api/home'
import { useMoreBooks } from 'lib/hooks'

const Page = () => {
  const { showBooks, hasMore, isOpenMenu, fetchData } =
    useMoreBooks(home.getHighestRated)

  return (
    <>
      <Navbar isOpen={isOpenMenu} />
      <MultipleBooksContainer
        type='評價超過8分的作品'
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
