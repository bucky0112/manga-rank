import { FC, useState, SetStateAction } from 'react'
import Image from 'next/image'
import styles from '../../styles/user/SignUp.module.scss'
import { user } from '../../lib/api/user'

interface User {
  email: string
  github_oauth: string
  google_oauth: string
  password: string
  user_name: string
  nickname: string
}

interface Props {
  setCurrentPage: (currentPage: SetStateAction<string>) => void
}

const SignUp: FC<Props> = ({ setCurrentPage }) => {
  const [userInfo, setUserInfo] = useState<User>({} as User)

  const handleSubmit = async () => {
    try {
      const res = await user.newUser({
        email: userInfo.email,
        user_name: userInfo.user_name,
        password: userInfo.password,
        github_oauth: '',
        google_oauth: '',
        nickname: userInfo.nickname
      })
      setCurrentPage("main")
      console.log(res)
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
      <form className={styles.signUp}>
        <h1>註冊</h1>
        <form>
          <label>
            真實姓名
            <input
              type='text'
              onChange={(e) =>
                setUserInfo({ ...userInfo, user_name: e.target.value })
              }
            />
          </label>
          <label>
            暱稱
            <input
              type='text'
              onChange={(e) =>
                setUserInfo({ ...userInfo, nickname: e.target.value })
              }
            />
          </label>
          <label>
            Email
            <input
              type='email'
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </label>
          <label>
            密碼
            <input
              type='password'
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
          </label>
          <div className={styles.submit}>
            <button type="button" onClick={handleSubmit}>
              註冊
            </button>
          </div>
        </form>
      </form>
    </main>
  )
}

export { SignUp }
