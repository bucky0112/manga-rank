import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { manga } from 'lib/api/manga'

const Page = () => {
  const router = useRouter()
  const id = router.query.id as string

  const getCategory = async (id: string, page: string) => {
    try {
      const { data } = await manga.getCategory(id, page)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (id) {
      getCategory(id, '1')
    }
  }, [id])

  return (
    <div>
      <h1>Page</h1>
    </div>
  )
}

export default Page
