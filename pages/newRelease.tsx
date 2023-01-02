import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BookCard } from 'components/shared'
import { home } from 'lib/api/home'
import { bookFromApi, book } from 'lib/types'
import { listToObj } from 'lib/utils/array'

const Page = () => {
  const [showBooks, setShowBooks] = useState<book[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = async () => {
    const { data } = await home.getNewRelease(page.toString())
    const res = data?.data?.map((item: bookFromApi) => {
      return {
        ...item,
        tag: listToObj(item?.tag?.split(',')?.slice(0, 2)),
        is_adult: item.is_adult === 1
      }
    })
    setShowBooks([...showBooks, ...res])
    setPage(page + 1)
    if (showBooks.length > 10) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    page <= 10 && fetchData()
  }, [page])

  const renderBooks = (books: book[]) => (
    <ul className='grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-14 mb-20'>
      {books?.map(({ uuid, title_cn, image, tag, is_adult, point }) => (
        <li
          key={uuid}
          className='justify-self-center flex flex-col justify-center items-center w-77 h-135'
        >
          <BookCard
            title={title_cn}
            cover={image}
            tag={tag}
            uuid={uuid}
            isAdult={is_adult}
            point={point}
          />
        </li>
      ))}
    </ul>
  )

  return (
    <div>
      <span className='self-start bg-darkGrey text-primary text-[28px] px-6 py-2 rounded-full mt-16'>
        最新發行
      </span>
      <InfiniteScroll
        dataLength={showBooks.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {renderBooks(showBooks)}
      </InfiniteScroll>
    </div>
  )
}

export default Page
