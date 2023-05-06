import { FC, useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { MdArrowDropDown } from 'react-icons/md'
import styles from 'styles/SideBar.module.scss'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { selectUserInfo } from 'store/feat/user/userInfoSlice'
import { setSideBarOpen } from 'store/feat/share/sideBarSlice'
import { useStorage } from 'lib/hooks'
import categories from 'lib/utils/categories'

type Props = {
  isOpen: boolean
}

const SideBar: FC<Props> = ({ isOpen }) => {
  const router = useRouter()
  const userInfo = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  const { clearStorage } = useStorage('userInfo', {})
  const [isToggle, setIsToggle] = useState<Record<string, boolean>>({
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

  return (
    <div className={`${styles.waveBar} ${isOpen && styles.open}`}>
      <div className={styles.boxCenter}>
        <ul>
          <li>會員中心</li>
          {userInfo?.nickname ? (
            <li onClick={handleLogout}>登出</li>
          ) : (
            <li>登入/註冊</li>
          )}
          <li>找漫畫</li>
          <li>近期流行</li>
          <li>
            <div
              className='flex items-center gap-x-2'
              onClick={() => handleToggle('type')}
            >
              <p>選擇類別</p>
              <MdArrowDropDown />
            </div>
            <ul
              className={`${styles.categoriesList} ${
                isToggle.type && styles.open
              }`}
            >
              {categories.map((category) => (
                <li
                  key={category.id}
                  data-id={category.id}
                  onClick={handleClick}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </li>
          <li>依平台</li>
        </ul>
      </div>
    </div>
  )
}

export { SideBar }
