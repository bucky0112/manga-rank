import { FC, SetStateAction } from 'react'
import Image from 'next/image'
import styles from '../../styles/user/SignUp.module.scss'
import { user } from '../../lib/api/user'
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldValues
} from 'react-hook-form'
import { InputText } from './'
interface Props {
  setCurrentPage: (currentPage: SetStateAction<string>) => void
}

type Inputs = {
  email: string
  github_oauth: string
  google_oauth: string
  password: string
  user_name: string
  nickname: string
}

const SignUp: FC<Props> = ({ setCurrentPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, user_name, nickname } = data
    try {
      await user.newUser({
        email,
        user_name,
        password,
        github_oauth: '',
        google_oauth: '',
        nickname
      })
      setCurrentPage('main')
    } catch (err) {
      console.error(err)
    }
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
              required: true
            }}
            errorText='此欄位為必填'
          />
          <InputText
            register={register}
            errors={errors}
            name='nickname'
            text='暱稱'
            option={{
              required: true
            }}
            errorText='超過25字元'
          />
          <InputText
            register={register}
            errors={errors}
            name='email'
            text='Email'
            option={{
              required: true
            }}
            errorText='Email填寫不正確，請再檢查拼字是否完整'
          />
          <InputText
            register={register}
            errors={errors}
            name='password'
            text='密碼'
            option={{
              required: true
            }}
            errorText='此欄位為必填'
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
