import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { setUserInfo, selectUserInfo } from 'store/feat/user/userInfoSlice'
import { setSideBarOpen } from 'store/feat/share/sideBarSlice'
import { useStorage } from 'lib/hooks'
import { IoSearchOutline } from 'react-icons/io5'
import { search } from 'lib/api/search'
import { RiLoginBoxLine } from 'react-icons/ri'

type Props = {
  isOpen: boolean
}

const Navbar: FC<Props> = ({ isOpen }) => {
  const dispatch = useAppDispatch()
  const { storedValue } = useStorage('userInfo', {})
  const userInfo = useAppSelector(selectUserInfo)
  const router = useRouter()

  useEffect(() => {
    Object.keys(storedValue).length > 0 &&
      dispatch(setUserInfo({ info: storedValue }))
  }, [storedValue])

  const [isShowSearch, setIsShowSearch] = useState(false)

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const { data } = await search.getKeywords(e.currentTarget.value)
        const { keywords } = data
        router.push(`/search/${keywords}`)
      } catch (_) {
        router.push('/search/none')
      }
    }
  }

  // 當width小於600px顯示icon
  const [showIcon, setSshowIcon] = useState(false)

  useEffect(() => {
    function handleResize() {
      setSshowIcon(window.innerWidth < 600)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav
      onMouseEnter={() => setIsShowSearch(true)}
      onMouseLeave={() => setIsShowSearch(false)}
      className='flex 2xl:gap-[117px] xl:gap-[53px] slg:gap-[40px] xls:gap-[26px] xs:gap-[27px] items-center bg-blurGray backdrop-blur-sm px-6 py-4 font-inter fixed z-50 w-full'
    >
      <Link href='/'>
        <a className='flex-[0.1] pl-10 place-self-center'>
          <h1 className='flex justify-center items-center text-xl text-mediumGrey font-bold bg-primary rounded-full w-7 h-7'>
            K
          </h1>
        </a>
      </Link>
      <div className='flex-[4]'>
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
      <div className='flex-1 2xl:gap-[117px] xl:gap-[53px] slg:gap-[40px] xls:gap-[26px] xs:gap-[27px] flex items-center justify-around'>
        {userInfo?.nickname ? (
          <p className='text-darkGrey text-xl mr-10'>{userInfo?.nickname}</p>
        ) : (
          <>
            <Link href='/user'>
              <a className='text-darkGrey text-xl whitespace-nowrap'
                style={{ display: showIcon ? 'none' : 'inline-block' }}>登入/註冊</a>
            </Link>
            <Link href='/user'>
              <a className='text-darkGrey text-2xl whitespace-nowrap'
                style={{ display: showIcon ? 'inline-block' : 'none' }}><RiLoginBoxLine /></a>
            </Link>
          </>
        )}
        <div
          className={classNames({
            'tham tham-e-squeeze tham-w-6 mr-[43px]': true,
            'tham-active': isOpen
          })}
          onClick={() => dispatch(setSideBarOpen({ isOpen: !isOpen }))}
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
