import { FC, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useGoogleLogin } from "@react-oauth/google"
// import { GoogleLogin } from '@react-oauth/google'
import { InputText } from './'
import { EmailValidator } from 'lib/validate/formValidate'
import APIClient from 'lib/api/customClient'
import { user } from 'lib/api/user'
import { useStorage } from 'lib/hooks/'
import OAuth from './Oauth'

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

  // const handleGooglOauth = useGoogleLogin({
  //   onSuccess: async ({ access_token }) => {
  //     try {
  //       const res = await new APIClient("https://www.googleapis.com", access_token).get("/oauth2/v3/userinfo")
  //       const { sub, email } = res.data
  //       fetchGoogle({ sub, email })
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   },
  // })
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  return (
    <main className='w-screen bg-mainBG'>
      <h1 className='text-center text-3xl font-semibold py-2'>註冊/登入</h1>
      <div className='grid grid-cols-5 px-60 bg-[url("/svg/gap.svg")] bg-no-repeat bg-center'>
        <div className='col-start-1 col-end-3 grid grid-rows-4 justify-center'>
          <div className='row-span-2 my-10'>
            <Image
              src='/svg/signup.svg'
              width={505}
              height={340}
              layout='fixed'
              alt='sign up'
            />
          </div>
          <div className='row-span-2 flex flex-col gap-14 w-full mt-12'>
            <button
              type='button'
              className='text-3xl font-semibold text-darkGrey bg-lightGrey rounded-full py-5 w-full'
              onClick={() => atClick('signUp')}
            >
              註冊新帳號
            </button>
            {/* <button
              onClick={() => login()}
              type='button'
              className='text-3xl font-semibold text-darkGrey bg-lightGrey rounded-full py-5 w-full mt-1'
            >
              使用 Google 帳號登入
            </button> */}
            <OAuth />
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse)
              }}
              onError={() => {
                console.log('Login Failed')
              }}
            /> */}
          </div>
        </div>
        <div className='col-start-4 col-end-6 grid grid-rows-4 justify-center'>
          <div className='row-span-2 my-10'>
            <Image
              src='/svg/signin.svg'
              width={505}
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
                  className='text-3xl font-semibold bg-primary rounded-full px-6 py-3 cursor-pointer'
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
