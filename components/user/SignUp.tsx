import { FC, SetStateAction } from 'react'
import Image from 'next/image'
import styles from '../../styles/user/SignUp.module.scss'
import { user } from '../../lib/api/user'
import { useForm, SubmitHandler } from 'react-hook-form'
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
          <div className={styles.inputText}>
            <label className={`${errors?.user_name ? styles.error : ''}`}>
              真實姓名
              <input
                type='text'
                {...register('user_name', { required: true })}
              />
            </label>
            <p>123</p>
          </div>
          <label className={`${errors?.nickname ? styles.error : ''}`}>
            暱稱
            <input type='text' {...register('nickname', { required: true })} />
          </label>
          <label className={`${errors?.email ? styles.error : ''}`}>
            Email
            <input
              type='text'
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
          </label>
          <label className={`${errors?.password ? styles.error : ''}`}>
            密碼
            <input
              type='password'
              {...register('password', { required: true, minLength: 8 })}
            />
          </label>
          <div className={styles.submit}>
            <input type='submit' value='註冊' />
          </div>
        </form>
      </div>
    </main>
  )
}

export { SignUp }
