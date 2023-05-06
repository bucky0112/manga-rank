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
  <ul className='grid grid-cols-7 2xl:grid-cols-7 2xl:gap-x-[71px] xl:grid-cols-5 slg:grid-cols-4 ssm:grid-cols-3 ssm:gap-x-[90px] xs:grid-cols-2 xs:gap-x-[48px] xl:gap-x-[84px] slg:gap-x-[45px] gap-y-[60px] mt-[60px]'>
    {books?.map(({ uuid, title_cn, image, tag, is_adult, point }) => (
      <li
        key={uuid}
        className='flex flex-col items-center w-[175px] h-[361px]'
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
