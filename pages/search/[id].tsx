import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import { useAppSelector } from 'store/hooks'
import { Navbar, Footer } from 'components'
import { Results } from 'components/search'
import { search } from 'lib/api/search'
import { book } from 'lib/types'

const Page = () => {
  const router = useRouter()
  const { id } = router.query
  const isOpen = useAppSelector(selectSideBarOpen)

  const [results, setResults] = useState<book[]>([])

  const searchBooks = async (keyword: string) => {
    if (keyword) {
      try {
        const { data } = await search.getKeywords(keyword)
        setResults(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    searchBooks(id as string)
  }, [id])

  return (
    <>
      <Navbar isOpen={isOpen} />
        <Results isOpen={isOpen} results={results} numbers={results.length} />
      <Footer />
    </>
  )
}

export default Page
