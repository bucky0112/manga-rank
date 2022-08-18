import Link from "next/link"

const Navbar = () => (
  <nav className="flex items-center justify-between bg-blurGray backdrop-blur-sm px-6 py-2">
    <h1 className='text-4xl text-mediumGrey font-bold bg-primary rounded-full px-3 py-1'>K</h1>
    <Link href='/'>
      <a className="text-darkGrey text-xl">登入/註冊</a>
    </Link>
  </nav>
)

export { Navbar }