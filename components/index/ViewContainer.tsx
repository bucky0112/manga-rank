import { FC } from 'react'
import { CardGroup } from './CardGroup'
import styles from '../../styles/ViewContainer.module.scss'

type Props = {
  isOpen: boolean
}

const ViewContainer: FC<Props> = ({ isOpen }) => (
  <main className={styles.container}>
    <div className={`${styles.waveBar} ${isOpen && styles.open}`}>
      <div className={styles.boxCenter}>
        <ul>
          <li>123</li>
        </ul>
      </div>
    </div>
    <CardGroup type='最新發行' />
    <CardGroup type='評價超過8分的作品' />
    <CardGroup type='各書店平台週冠軍' />
  </main>
)

export { ViewContainer }
