import { FC } from 'react'
import { CardGroup } from './'
import { SideBar } from 'components/shared'
import styles from 'styles/ViewContainer.module.scss'

type Props = {
  isOpen: boolean
}

const apiIndex: Record<string, string> = {
  getNewRelease: '最新發行',
  getHighestRated: '評價超過8分的作品',
  getTopSell: '各書店平台週冠軍'
}

const ViewContainer: FC<Props> = ({ isOpen }) => (
  <main className={styles.container}>
    <SideBar isOpen={isOpen} />
    {Object.entries(apiIndex).map(([apiName, type]) => (
      <CardGroup key={apiName} type={type} apiName={apiName} />
    ))}
  </main>
)

export { ViewContainer }
