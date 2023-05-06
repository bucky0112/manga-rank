import { FC, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { InputText } from './'
import { EmailValidator } from 'lib/validate/formValidate'
import { user } from 'lib/api/user'
import { useStorage } from 'lib/hooks'
import { useAppDispatch } from 'store/hooks'
import { setGoogleOauthInfo } from 'store/feat/user/googleOauthSlice'

type IndexProps = {
  atClick: Dispatch<SetStateAction<string>>
  currentPage: String
}

type Inputs = {
  email: string
  password: string
}

const Main: FC<IndexProps> = ({ atClick }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const { setValue } = useStorage('userInfo', {})

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await user.loginUser(data)
      setValue(res?.data)
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  const handleGoogleOauth = async () => {
    const popup = window.open(
      `${process.env.NEXT_PUBLIC_BASE_URL}oauth/google/register`,
      'newwindows',
      'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'
    )

    return new Promise<void>((resolve, reject) => {
      window.addEventListener(
        'message',
        function (e) {
          try {
            let json = JSON.parse(e.data)
            dispatch(setGoogleOauthInfo({ info: json }))
            atClick('signUp')
            resolve()
          } catch (err) {
            console.error('Failed to parse JSON:', e.data)
          }
        },
        false
      )

      const interval = setInterval(() => {
        if (!popup?.closed) {
          return
        }

        clearInterval(interval)
        reject(new Error('Popup window closed.'))
      }, 1000)
    })
  }

  return (
    <main className='w-screen bg-mainBG pb-16'>
      <h1 className='text-center text-3xl font-semibold py-16'>註冊/登入</h1>
      <div className='relative grid grid-cols-5 px-60'>
        <div className='absolute left-0 right-0 mx-auto w-64 h-full bg-gap bg-no-repeat bg-center' />
        <div className='col-start-1 col-end-3 grid grid-rows-4 justify-center'>
          <div className='row-span-2 my-10'>
            <Image
              src='/svg/signup.svg'
              width={495}
              height={340}
              layout='fixed'
              alt='sign up'
            />
          </div>
          <div className='row-span-2 flex flex-col gap-14 w-full mt-12'>
            <button
              type='button'
              className='text-3xl font-semibold text-darkGrey bg-lightGrey rounded-full py-5 w-full hover:bg-primary'
              onClick={() => atClick('signUp')}
            >
              註冊新帳號
            </button>
            <button
              onClick={handleGoogleOauth}
              type='button'
              className='text-3xl font-semibold text-darkGrey bg-lightGrey rounded-full py-5 w-full mt-1 hover:bg-primary'
            >
              使用 Google 帳號註冊
            </button>
          </div>
        </div>
        <div className='col-start-4 col-end-6 grid grid-rows-4 justify-center'>
          <div className='row-span-2 my-10'>
            <Image
              src='/svg/signin.svg'
              width={495}
              height={340}
              layout='fixed'
              alt='sign in'
            />
          </div>
          <div className='row-start-3 row-end-6 w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputText
                register={register}
                errors={errors}
                name='email'
                text='帳號'
                option={{
                  required: {
                    value: true,
                    message: '此欄位為必填'
                  },
                  pattern: {
                    value: EmailValidator,
                    message: 'Email填寫不正確，請再檢查拼字是否完整'
                  }
                }}
              />
              <InputText
                register={register}
                errors={errors}
                name='password'
                text='密碼'
                option={{
                  required: {
                    value: true,
                    message: '此欄位為必填'
                  },
                  minLength: {
                    value: 8,
                    message: '不得少於8個英文字母或數字'
                  }
                }}
                type='password'
              />
              <div className='flex items-center justify-end gap-10 mt-14'>
                <input
                  type='submit'
                  value='登入'
                  className='text-3xl font-semibold bg-primary hover:bg-lightGrey rounded-full px-6 py-3 cursor-pointer'
                />
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
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export { Main }
