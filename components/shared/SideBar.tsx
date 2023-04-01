import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { MdArrowDropDown } from 'react-icons/md'
import styles from 'styles/SideBar.module.scss'
import { useAppSelector } from 'store/hooks'
import { selectUserInfo } from 'store/feat/user/userInfoSlice'
import { useStorage } from 'lib/hooks'

type Props = {
  isOpen: boolean
}

const categories = [
  { id: 1, name: '職場社會' },
  { id: 2, name: '恐怖靈異' },
  { id: 3, name: '少年熱血' },
  { id: 4, name: '戀愛故事' },
  { id: 5, name: '武俠格鬥' },
  { id: 6, name: '科幻魔幻' },
  { id: 7, name: '競技體育' },
  { id: 8, name: '偵探推理' },
  { id: 9, name: '療癒幽默' },
  { id: 10, name: 'BL漫畫' },
  { id: 11, name: '百合漫畫' }
]

const SideBar: FC<Props> = ({ isOpen }) => {
  const router = useRouter()
  const userInfo = useAppSelector(selectUserInfo)
  const { clearStorage } = useStorage('userInfo', {})
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleLogout = () => {
    clearStorage()
    router.reload()
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
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
