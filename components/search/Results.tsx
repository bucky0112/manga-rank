import { FC } from 'react'
import classNames from 'classnames'
import { SideBar, BookCard } from 'components/shared'
import { book } from 'lib/types'

type Props = {
  isOpen: boolean
  results: book[]
  numbers: number
}

const Results: FC<Props> = ({ isOpen, results, numbers }) => (
  <main
    className={classNames({
      'flex flex-col gap-5 py-10 2xl:px-16 px-48 bg-index bg-fixed bg-[length:300px] bg-no-repeat top-0 left-0 overflow-x-hidden relative font-inter':
        true,
      'justify-center': numbers > 0,
      'h-[90vh]': numbers < 1
    })}
  >
    <SideBar isOpen={isOpen} />
    <div
      className={classNames({
        'mt-12': numbers > 0,
        'mt-16': numbers < 1
      })}
    >
      {numbers > 0 ? (
        <p className='font-semibold text-2xl text-darkGrey'>{`共 ${numbers} 筆結果`}</p>
      ) : (
        <p className='text-lg font-normal'>好像沒有你想找的作品...</p>
      )}
    </div>
    <ul className='grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-14 mb-12'>
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
