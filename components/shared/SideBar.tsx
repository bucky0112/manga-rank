import { FC, useState } from 'react'
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
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleLogout = () => {
    clearStorage()
    router.reload()
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    dispatch(setSideBarOpen({ isOpen: false }))
    router.push(`/category/${e.target.value}`)
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
          <li className={styles.dropdown}>
            <select
              value={selectedCategory}
              onChange={handleChange}
              className={styles.select}
            >
              <option value=''>選擇類別</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <MdArrowDropDown className={styles.arrowIcon} />
          </li>
          <li>依平台</li>
        </ul>
      </div>
    </div>
  )
}

export { SideBar }
