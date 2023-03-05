import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BookCard, SideBar } from 'components/shared'
import { book } from 'lib/types'
import styles from 'styles/ViewContainer.module.scss'

type Props = {
  type: string
  isOpen: boolean
  showBooks: book[]
  fetchData: () => void
  hasMore: boolean
}

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

const MultipleBooksContainer: FC<Props> = ({ isOpen, showBooks, fetchData, hasMore, type }) => (
  <main className={styles.container}>
    <SideBar isOpen={isOpen} />
    <span className='self-start bg-darkGrey text-primary text-[28px] px-6 py-2 rounded-full mt-16'>
      {type}
    </span>
    <InfiniteScroll
      dataLength={showBooks.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {renderBooks(showBooks)}
    </InfiniteScroll>
  </main>
)

export { MultipleBooksContainer }
