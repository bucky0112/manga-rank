import { FC, SetStateAction, Dispatch, useEffect, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { setUserInfo, selectUserInfo } from 'store/feat/user/userInfoSlice'
import { useStorage } from 'lib/hooks'
import { IoSearchOutline } from 'react-icons/io5'
import { search } from 'lib/api/search'

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

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const res = await search.getKeywords(e.currentTarget.value)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <nav
      onMouseEnter={() => setIsShowSearch(true)}
      onMouseLeave={() => setIsShowSearch(false)}
      className='grid grid-cols-12 items-center bg-blurGray backdrop-blur-sm px-6 py-4 font-inter fixed z-50 w-full'
    >
      <Link href='/'>
        <a className='col-span-1 place-self-center'>
          <h1 className='flex justify-center items-center text-xl text-mediumGrey font-bold bg-primary rounded-full w-7 h-7'>
            K
          </h1>
        </a>
      </Link>
      <div className="col-start-3 col-end-10">
        {isShowSearch ? (
          <input
            type='text'
            placeholder='請輸入關鍵字搜尋'
            className='border-2 border-black outline-black rounded-full px-4 py-1 min-w-full'
            onKeyDown={handleSearch}
          />
        ) : (
          <IoSearchOutline className='text-2xl text-darkGrey' />
        )}
      </div>
      <div className='col-start-10 col-span-3 flex items-center justify-around'>
        {userInfo?.nickname ? (
          <p className='text-darkGrey text-xl mr-10'>{userInfo?.nickname}</p>
        ) : (
          <Link href='/user'>
            <a className='text-darkGrey text-xl mr-10'>登入/註冊</a>
          </Link>
        )}
        <div
          className={classNames({
            'tham tham-e-squeeze tham-w-6': true,
            'tham-active': isOpen
          })}
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
