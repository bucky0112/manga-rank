import { FC } from 'react'
import { SideBar, BookCard } from 'components/shared'
import { book } from 'lib/types'

type Props = {
  isOpen: boolean
  results: book[]
}

const Results: FC<Props> = ({ isOpen, results }) => (
  <main className='flex flex-col justify-center gap-5 py-10 px-48 bg-index bg-fixed bg-[length:300px] bg-no-repeat top-0 left-0 overflow-x-hidden relative font-inter'>
    <SideBar isOpen={isOpen} />
    <ul className='grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-14 my-12'>
      {results?.map(({ uuid, title_cn, image, tag, is_adult, point }) => (
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
  </main>
)

export { Results }
