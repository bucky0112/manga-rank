import { FC } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/SideBar.module.scss'
import { useAppSelector } from '../../store/hooks'
import { selectUserInfo } from '../../store/feat/user/userInfoSlice'
import { useStorage } from '../../lib/hooks'

type Props = {
  isOpen: boolean
}

const SideBar: FC<Props> = ({ isOpen }) => {
  const router = useRouter()
  const userInfo = useAppSelector(selectUserInfo)
  const { clearStorage } = useStorage('userInfo', {})

  const handleLogout = () => {
    clearStorage()
    router.reload()
  }

  return (
    <div className={`${styles.waveBar} ${isOpen && styles.open}`}>
      <div className={styles.boxCenter}>
        <ul>
          <li>會員中心</li>
          {userInfo?.nickname ? (<li onClick={handleLogout}>登出</li>) : <li>登入/註冊</li>}
          <li>找漫畫</li>
          <li>近期流行</li>
          <li>依類別</li>
          <li>依平台</li>
        </ul>
      </div>
    </div>
  )
}

export { SideBar }
