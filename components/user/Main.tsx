import { FC, Dispatch, SetStateAction } from 'react'
import Image from "next/image"
import Link from "next/link"

type IndexProps = {
  atClick: Dispatch<SetStateAction<string>>
  currentPage: String
}

const Main: FC<IndexProps> = ({ atClick }) => {
  return (
    <main className='w-screen bg-mainBG'>
      <h1 className='text-center text-3xl font-semibold py-16'>註冊/登入</h1>
      <div className='grid grid-cols-5 px-60'>
        <div className='col-start-1 col-end-3 grid grid-rows-5 items-center justify-center'>
          <div className='row-span-2 my-10'>
            <Image
              src='/svg/signup.svg'
              width={505}
              height={340}
              layout='fixed'
              alt='sign up'
            />
          </div>
          <div className='row-span-2 flex flex-col gap-20 w-[505px]'>
            <button
              type='button'
              className='text-3xl font-semibold text-darkGrey bg-lightGrey rounded-full py-5 w-full'
              onClick={() => atClick('signUp')}
            >
              註冊新帳號
            </button>
            <button
              type='button'
              className='text-3xl font-semibold text-darkGrey bg-lightGrey rounded-full py-5 w-full'
            >
              使用 Google 帳號登入
            </button>
          </div>
        </div>
        <div className='col-start-3 col-end-4 w-full h-full relative'>
          <Image
            src='/svg/gap.svg'
            layout='fill'
            objectFit='contain'
            width='100%'
            height='100%'
            alt='gap'
            className=''
          />
        </div>
        <div className='col-start-4 col-end-6 grid grid-rows-5 items-center justify-center'>
          <div className='row-span-2 my-10'>
            <Image
              src='/svg/signin.svg'
              width={505}
              height={340}
              layout='fixed'
              alt='sign in'
            />
          </div>
          <div className='row-span-2 flex flex-col gap-10 w-[505px] -mt-10'>
            <div className='flex flex-col gap-4 w-full'>
              <label htmlFor='username' className='text-xl text-darkGrey'>
                帳號
              </label>
              <input
                type='text'
                id='username'
                className='bg-lightGrey rounded-full py-5'
              ></input>
            </div>
            <div className='flex flex-col gap-4 w-full'>
              <label htmlFor='password' className='text-xl text-darkGrey'>
                密碼
              </label>
              <input
                type='password'
                id='password'
                className='bg-lightGrey rounded-full py-5'
              ></input>
            </div>
          </div>
          <div className='row-span-2 self-start flex items-center justify-end gap-10'>
            <button
              type='button'
              className='text-3xl font-semibold bg-primary rounded-full px-6 py-3'
            >
              登入
            </button>
            <Link href='/'>
              <a className='flex items-center text-xl text-mediumGrey'>
                <Image
                  src='/svg/star.svg'
                  layout='fixed'
                  width={36}
                  height={34}
                  alt='forget password'
                />
                忘記密碼
                <Image
                  src='/svg/star.svg'
                  layout='fixed'
                  width={36}
                  height={34}
                  alt='forget password'
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export { Main }