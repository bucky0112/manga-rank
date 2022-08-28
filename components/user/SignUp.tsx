import { useState } from 'react'
import Image from 'next/image'
import styles from "../../styles/user/SignUp.module.scss"
import { newUser } from '../../lib/api/apis'

interface User {
  name: string
  nickName: string
  email: string
  password: string
  github_oauth: string
  google_oauth: string
}

const SignUp = () => {
  const [user, setUser] = useState<User>({
    name: '',
    nickName: '',
    email: '',
    password: '',
    github_oauth: '',
    google_oauth: ''
  })

  const handleSubmit = async () => {
    const res = await newUser({
      email: user.email,
      user_name: user.name,
      password: user.password,
      github_auth: "",
      google_auth: ""
    })
    console.log(res)
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
        <form>
          <label>
            真實姓名
            <input
              type='text'
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <label>
            暱稱
            <input
              type='text'
              onChange={(e) => setUser({ ...user, nickName: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              type='email'
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label>
            密碼
            <input
              type='password'
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <div className={styles.submit}>
            <button type='submit' onClick={handleSubmit}>
              註冊
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export { SignUp }
