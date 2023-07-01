import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BsPencilFill } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import classNames from 'classnames'
import { Navbar, Footer } from 'components'
import { SideBar } from 'components/shared'
import { InputText, UploadModal } from 'components/user'
import { useAppSelector } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import styles from 'styles/user/EditUserProfile.module.scss'

type UserInfo = {
  realName: string
  nickName: string
  email: string
  password: string
  newPassword: string
}

const submitStyle = 'bg-lightGrey rounded-full py-3 px-5 hover:bg-primary'

const Page = () => {
  const isOpen = useAppSelector(selectSideBarOpen)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UserInfo>()

  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    console.log(data)
  }

  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [file, setFile] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file)
      }
    }
  }, [file])

  const handlePasswordOpen = () => {
    setIsPasswordOpen(!isPasswordOpen)
  }

  const handleUploadModalSwitch = () => {
    setIsUploadModalOpen(!isUploadModalOpen)
  }

  return (
    <>
      <Navbar isOpen={isOpen} />
      <main
        className={classNames({
          'relative bg-mainBG font-inter pt-24 pb-2': true,
          'h-[95vh]': !isOpen,
          'min-h-screen': isOpen
        })}
      >
        <div className='flex justify-center'>
          {isUploadModalOpen && (
            <UploadModal atClose={handleUploadModalSwitch} setFile={setFile} />
          )}
        </div>
        <SideBar isOpen={isOpen} />
        <div className='flex flex-col items-center gap-y-1'>
          <Image
            src={file || 'https://fakeimg.pl/108x108/'}
            layout='fixed'
            width='120'
            height='120'
            alt='user'
            className='rounded-full'
          />
          <button
            type='button'
            onClick={handleUploadModalSwitch}
            className='flex items-center gap-x-2 border rounded-full py-1 px-6 shadow-2xl mt-5'
          >
            <BsPencilFill size='14' />
            <p className='text-sm'>修改頭像</p>
          </button>
        </div>
        <div className='w-[600px] mx-auto mt-16'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-8'>
              <InputText
                register={register}
                errors={errors}
                name='realName'
                text='真實姓名'
                style={styles.inputText}
                errorMessageStyle={styles.errorMessage}
                errorTextStyle={styles.errorText}
              />
              <InputText
                register={register}
                errors={errors}
                name='nickName'
                text='暱稱'
                style={styles.inputText}
                errorMessageStyle={styles.errorMessage}
                errorTextStyle={styles.errorText}
              />
              <InputText
                register={register}
                errors={errors}
                name='email'
                text='Email'
                style={styles.inputText}
                errorMessageStyle={styles.errorMessage}
                errorTextStyle={styles.errorText}
              />
            </div>
            <button
              type='button'
              onClick={handlePasswordOpen}
              className='flex items-center mx-auto border border-black rounded-full py-3 px-6 mt-10'
            >
              <p>修改密碼</p>
              <IoMdArrowDropdown
                size='16'
                className={classNames({
                  'transform rotate-90': !isPasswordOpen
                })}
              />
            </button>
            {isPasswordOpen && (
              <>
                <div className='flex flex-col gap-y-8 mt-5'>
                  <InputText
                    register={register}
                    errors={errors}
                    name='password'
                    text='現在密碼'
                    style={styles.inputText}
                    errorMessageStyle={styles.errorMessage}
                    errorTextStyle={styles.errorText}
                  />
                  <InputText
                    register={register}
                    errors={errors}
                    name='newPassword'
                    text='新密碼'
                    style={styles.inputText}
                    errorMessageStyle={styles.errorMessage}
                    errorTextStyle={styles.errorText}
                  />
                </div>
                <p className='flex flex-col text-mediumGrey'>
                  <span>-密碼更新後將會將您自動登出，並請重新登入一次。</span>
                  <span>-不得少於8個英文字母或數字</span>
                </p>
              </>
            )}
            <div className='flex items-center justify-between w-1/2 mx-auto mt-16'>
              <button type='button' className={submitStyle}>
                放棄修改
              </button>
              <button type='submit' className={submitStyle}>
                更新修改
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Page
