import { useRouter } from 'next/router'
import { useAppSelector } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import { Navbar, Footer, MultipleBooksContainer } from 'components'
import { useMoreCategory } from 'lib/hooks'
import { manga } from 'lib/api/manga'
import categories from 'lib/utils/categories'

const Page = () => {
  const router = useRouter()
  const id = router.query.id as string

  const isOpen = useAppSelector(selectSideBarOpen)

  const { hasMore, fetchData, showCategory } = useMoreCategory(
    manga.getCategory,
    id
  )

  return (
    <>
      <Navbar isOpen={isOpen} />
      <MultipleBooksContainer
        type={categories[Number(id) - 1]?.name}
        isOpen={isOpen}
        showBooks={showCategory}
        fetchData={fetchData}
        hasMore={hasMore}
      />
      <Footer />
    </>
  )
}

export default Page
