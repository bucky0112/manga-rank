import { FC, SetStateAction, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'
import { useAppSelector } from 'store/hooks'
import { selectGoogleOauthInfo } from 'store/feat/user/googleOauthSlice'
import { InputText } from './'
import { user } from 'lib/api/user'
import { EmailValidator } from 'lib/validate/formValidate'
import { useAppDispatch } from 'store/hooks'
import { cleanGoogleOauthInfo } from 'store/feat/user/googleOauthSlice'
import styles from 'styles/user/SignUp.module.scss'
interface Props {
  setCurrentPage: (currentPage: SetStateAction<string>) => void
}

type Inputs = {
  email: string
  password: string
  user_name: string
  nickname: string
}

const SignUp: FC<Props> = ({ setCurrentPage }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>()

  const dispatch = useAppDispatch()
  const googleOauthInfo = useAppSelector(selectGoogleOauthInfo)
  const router = useRouter()

  useEffect(() => {
    if (googleOauthInfo.token) {
      setValue('email', googleOauthInfo.email)
      setValue('nickname', googleOauthInfo.nickname)
    }
  }, [googleOauthInfo])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, user_name, nickname } = data
    try {
      await user.newUser({
        email,
        user_name,
        password,
        nickname
      })
      router.push(`/register_success/${email}`)
    } catch (err) {
      console.error(err)
      setCurrentPage('main')
    }
    dispatch(cleanGoogleOauthInfo())
  }

  return (
    <main className={styles.container}>
      <div className={styles.background}>
        <Image
          src='/svg/signup_bg.svg'
          height={1240}
          width={850}
          layout='responsive'
          alt='sign up'
        />
      </div>
      <div className={styles.signUp}>
        <h1>註冊</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            register={register}
            errors={errors}
            name='user_name'
            text='真實姓名'
            option={{
              required: {
                value: true,
                message: '此欄位為必填'
              }
            }}
          />
          <InputText
            register={register}
            errors={errors}
            name='nickname'
            text='暱稱'
            option={{
              required: {
                value: true,
                message: '此欄位為必填'
              },
              maxLength: {
                value: 25,
                message: '超過25字'
              }
            }}
            errorText='超過25字元'
          />
          <InputText
            register={register}
            errors={errors}
            name='email'
            text='Email'
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
            errorText='不得少於8個英文字母或數字'
            type="password"
          />
          <div className={styles.submit}>
            <input type='submit' value='註冊' />
          </div>
        </form>
      </div>
    </main>
  )
}

export { SignUp }
