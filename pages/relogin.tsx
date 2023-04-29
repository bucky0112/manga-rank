import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Footer } from 'components'
import { Navbar, InputText } from 'components/user'
import { useStorage } from 'lib/hooks'
import { user } from 'lib/api/user'
import { EmailValidator } from 'lib/validate/formValidate'
import styles from 'styles/user/SignUp.module.scss'

type Inputs = {
  email: string
  password: string
}

const Page = () => {
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

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.signUp}>
          <h1>重新登入</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='gap-y-10'>
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
            <div className='flex flex-col items-center justify-end gap-10 mt-14 mb-28'>
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
        <div className={styles.background}>
          <Image
            src='/svg/relogin_bg.svg'
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            height={1240}
            width={850}
            alt='sign up'
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Page
