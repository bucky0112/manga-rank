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
          <li>會員中心</li>
          <li>登入/註冊</li>
          <li>找漫畫</li>
          <li>近期流行</li>
          <li>依類別</li>
          <li>依平台</li>
        </ul>
      </div>
    </div>
    <CardGroup type='最新發行' />
    <CardGroup type='評價超過8分的作品' />
    <CardGroup type='各書店平台週冠軍' />
  </main>
)

export { ViewContainer }
