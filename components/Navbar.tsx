import { FC, SetStateAction, Dispatch, useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { setUserInfo, selectUserInfo } from 'store/feat/user/userInfoSlice'
import { useStorage } from 'lib/hooks'
import { IoSearchOutline } from 'react-icons/io5'

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}

const Navbar: FC<Props> = ({ setIsOpen, isOpen }) => {
  const dispatch = useAppDispatch()
  const { storedValue } = useStorage('userInfo', {})
  const userInfo = useAppSelector(selectUserInfo)

  useEffect(() => {
    Object.keys(storedValue).length > 0 &&
      dispatch(setUserInfo({ info: storedValue }))
  }, [storedValue])

  const [isShowSearch, setIsShowSearch] = useState(false)

  return (
    <nav
      onMouseEnter={() => setIsShowSearch(true)}
      onMouseLeave={() => setIsShowSearch(false)}
      className='flex items-center justify-between bg-blurGray backdrop-blur-sm px-6 py-2 font-inter fixed z-50 w-full'
    >
      <div className='flex items-center'>
        <Link href='/'>
          <a>
            <h1 className='text-4xl text-mediumGrey font-bold bg-primary rounded-full px-3 py-1'>
              K
            </h1>
          </a>
        </Link>
        {isShowSearch ? (
          <input type='text' placeholder='input' />
        ) : (
          <IoSearchOutline className='text-2xl text-darkGrey' />
        )}
      </div>
      <div className='flex items-center'>
        {userInfo?.nickname ? (
          <p className='text-darkGrey text-xl mr-10'>{userInfo?.nickname}</p>
        ) : (
          <Link href='/user'>
            <a className='text-darkGrey text-xl mr-10'>登入/註冊</a>
          </Link>
        )}
        <div
          className={`tham tham-e-squeeze tham-w-6 ${
            isOpen ? 'tham-active' : ''
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='tham-box'>
            <div className='tham-inner' />
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navbar }
