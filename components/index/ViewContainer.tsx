import { useState, useEffect } from 'react'
import { CardGroup } from './CardGroup'
import { manga } from '../../lib/api/manga'

interface books {
  uuid: string
  title_cn: string
  // tag1: string
  // tag2: string
  image: string
}

const ViewContainer = () => {
  /*const [showBooks, setShowBooks] = useState<books[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await manga.getBooks(10)
        const res = data?.data?.slice(0, 7)
        setShowBooks(res)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])*/

  return (
    <main className='flex flex-col justify-center gap-10 p-10 bg-index bg-fixed bg-[length:300px] bg-no-repeat'>
      <CardGroup
        // showBooks={showBooks}
        type='最新發行' />
      <CardGroup
        // showBooks={showBooks}
        type='評價超過8分的作品' />
      <CardGroup
        // showBooks={showBooks}
        type='各書店平台週冠軍' />
    </main>
  )
}

export { ViewContainer }
