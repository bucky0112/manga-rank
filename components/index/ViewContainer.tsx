import { FC, useEffect, useState } from 'react'
import { CardGroup, SideBar } from './'
// import { manga } from '../../lib/api/manga'
import { home } from '../../lib/api/home'
import styles from '../../styles/ViewContainer.module.scss'

type Props = {
  isOpen: boolean
}

interface bookFromApi {
  uuid: string
  title_cn: string
  tag: string
  image: string
  is_adult: number
}

interface bookTag {
  uuid: string
  name: string
}
interface book {
  uuid: string
  title_cn: string
  tag: bookTag[]
  image: string
  is_adult: boolean
}

const listToObj = (list: string[]) => {
  return list?.map((item: string) => {
    const [uuid, name] = item.split('§')
    return {
      uuid,
      name
    }
  })
}

const ViewContainer: FC<Props> = ({ isOpen }) => {
  const [newRelease, setNewRelease] = useState<book[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await home.getNewRelease("index")
        const res = data?.data?.map((item: bookFromApi) => {
          return {
            ...item,
            tag: listToObj(item?.tag?.split(',')?.slice(0, 2)),
            is_adult: item.is_adult === 1
          }
        })
        setNewRelease(res)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <main className={styles.container}>
      <SideBar isOpen={isOpen} />
      <CardGroup type='最新發行' state={newRelease} />
      {/* <CardGroup type='評價超過8分的作品' />
      <CardGroup type='各書店平台週冠軍' /> */}
    </main>
  )
}

export { ViewContainer }
