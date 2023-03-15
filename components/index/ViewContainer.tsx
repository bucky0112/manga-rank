import { FC } from 'react'
import { CardGroup, SideBar } from './'
import styles from '../../styles/ViewContainer.module.scss'

type Props = {
  isOpen: boolean
}

const ViewContainer: FC<Props> = ({ isOpen }) => (
  <main className={styles.container}>
    <SideBar isOpen={isOpen} />
    <CardGroup type='最新發行' apiName='getNewRelease' />
    <CardGroup type='評價超過8分的作品' apiName='getHighestRated' />
    <CardGroup type='各書店平台週冠軍' apiName='getTopSell' />
  </main>
)

export { ViewContainer }
