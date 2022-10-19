import { FC, SetStateAction, Dispatch } from 'react'
import Link from 'next/link'

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}

const Navbar: FC<Props> = ({ setIsOpen, isOpen }) => (
  <nav className='flex items-center justify-between bg-blurGray backdrop-blur-sm px-6 py-2'>
    <h1 className='text-4xl text-mediumGrey font-bold bg-primary rounded-full px-3 py-1'>
      K
    </h1>
    <div className='flex items-center'>
      <Link href='/user'>
        <a className='text-darkGrey text-xl mr-10'>登入/註冊</a>
      </Link>
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

export { Navbar }
