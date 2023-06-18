import { FC, useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { selectUserInfo } from 'store/feat/user/userInfoSlice'
import { setSideBarOpen } from 'store/feat/share/sideBarSlice'
import { useStorage } from 'lib/hooks'
import categories from 'lib/utils/categories'
import { SideBarOption } from './SideBarOption'
import styles from 'styles/SideBar.module.scss'

type Props = {
  isOpen: boolean
}

const SideBar: FC<Props> = ({ isOpen }) => {
  const router = useRouter()
  const userInfo = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  const { clearStorage } = useStorage('userInfo', {})
  const [isToggle, setIsToggle] = useState<Record<string, boolean>>({
    popular: false,
    type: false
  })

  const handleLogout = () => {
    clearStorage()
    router.reload()
  }

  const handleToggle = (type: string) => {
    setIsToggle({ ...isToggle, [type]: !isToggle[type] })
  }

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute('data-id')

    if (value) {
      dispatch(setSideBarOpen({ isOpen: false }))
      window.location.assign(`/category/${value}`)
    }
  }

  const toggles = [
    {
      id: 1,
      title: '近期流行',
      type: 'popular',
      options: []
    },
    {
      id: 2,
      title: '依類別',
      type: 'type',
      options: categories
    },
    {
      id: 3,
      title: '依平台',
      type: 'platform',
      options: []
    }
  ]

  const handleToUserProfile = () => {
    router.push('user/profile')
  }

  return (
    <div className={`${styles.waveBar} ${isOpen && styles.open}`}>
      <div className={styles.boxCenter}>
        <ul>
          <li onClick={handleToUserProfile}>會員中心</li>
          {userInfo?.nickname ? (
            <li onClick={handleLogout}>登出</li>
          ) : (
            <li className='mb-4'>登入/註冊</li>
          )}
          <p className={styles.topline}>找漫畫</p>
          {toggles.map((toggle) => (
            <li key={toggle.id}>
              <SideBarOption
                options={toggle.options}
                toggleType={isToggle[toggle.type]}
                onToggle={() => handleToggle(toggle.type)}
                onClick={handleClick}
                title={toggle.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { SideBar }
