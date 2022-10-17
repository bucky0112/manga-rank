import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className='flex items-center justify-between bg-mainBG backdrop-blur-sm px-6 py-2'>
      <Link href='/'>
        <a className='text-4xl text-mediumGrey font-bold bg-primary rounded-full px-3 py-1'>
          K
        </a>
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
    </nav>
  )
}

export { Navbar }
