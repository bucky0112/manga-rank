import { useState, useEffect } from 'react'
import { listToObj } from 'lib/utils/array'
import { bookFromApi, book } from 'lib/types'

const useMoreCategory = (api: any, id: string) => {
  const [showCategory, setShowCategory] = useState<book[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  const fetchData = async () => {
    const { data } = await api(id, page.toString())
    const res = data?.data?.map((item: bookFromApi) => {
      return {
        ...item,
        tag: listToObj(item?.tag?.split(',')?.slice(0, 2)),
        is_adult: item.is_adult === 1
      }
    })
    setShowCategory([...showCategory, ...res])
    setPage(page + 1)
    if (showCategory.length > 10) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    page <= 10 && fetchData()
  }, [page])

  return { showCategory, hasMore, isOpenMenu, setIsOpenMenu, fetchData }
}

export { useMoreCategory }
