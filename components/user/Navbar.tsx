import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className='flex items-center justify-between bg-mainBG backdrop-blur-sm px-6 py-2'>
      <h1 className='text-4xl text-mediumGrey font-bold bg-primary rounded-full px-3 py-1'>
        K
      </h1>
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
