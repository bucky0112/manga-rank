import { FC } from 'react'
import styles from '../../styles/SideBar.module.scss'

type Props = {
  isOpen: boolean
}

const SideBar: FC<Props> = ({ isOpen }) => (
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
)

export { SideBar }