import { FC, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { MdOutlineQuestionMark } from 'react-icons/md'
import { HiPlus, HiMinus } from 'react-icons/hi'
import explodeSVG from 'public/svg/explode.svg'
import { useAppDispatch } from 'store/hooks'
import {
  setEditPermission,
  setCommentDetail,
  setDeletePermission
} from 'store/feat/user/commentSlice'
import { useStorage } from 'lib/hooks'
import { agreeAPI } from 'lib/api/agree'
import styles from 'styles/book/UserComment.module.scss'
import { set } from 'react-hook-form'

interface props {
  agree: number
  chapter: string
  description: string
  disagree: number
  isOwn: number
  isThunder: number
  mangaUuid: string
  point: string
  suspect: number
  uuid: string
  nickname: string
  bookTitle: string
}

interface Props {
  state: props
  update: () => void
}

interface ButtonProps {
  number: number
  text: string
  icon: React.ReactNode
  atPress?: () => void
}

interface params {
  uuid: string
  status: number
}

const Button: React.FC<ButtonProps> = ({ number, text, icon, atPress }) => {
  const disGradientBtn = styles.disGradientBtn
  const gradientBtn = styles.gradientBtn

  const numberText = number > 100 ? '99+' : number

  return (
    <button
      type='button'
      className={number ? gradientBtn : disGradientBtn}
      onClick={atPress}
    >
      {icon}
      <p>
        {text}
        <span>
          {numberText || ''}
        </span>
      </p>
    </button>
  )
}

const UserComment: FC<Props> = ({ state, update }) => {
  const {
    chapter,
    description,
    isOwn,
    isThunder,
    mangaUuid,
    point,
    uuid,
    nickname,
    bookTitle,
    agree,
    disagree,
    suspect
  } = state
  const dispatch = useAppDispatch()
  const { storedValue, setValue } = useStorage('userInfo', {})
  const token = storedValue?.token || ''
  const router = useRouter()
  const [showUpdate, setShowUpdate] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowUpdate(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  const handleShowUpdate = () => {
    setShowUpdate(!showUpdate)
    dispatch(
      setCommentDetail({
        description,
        isThunder,
        point,
        chapter,
        bookTitle,
        mangaUuid,
        uuid
      })
    )
  }

  const handleDeleteComment = async () => {
    dispatch(setDeletePermission(true))
  }

  const handleEditComment = () => {
    dispatch(setEditPermission(true))
    router.push(`/comment/${uuid}`)
  }

  const handleAgree = async (status: number) => {
    try {
      const { data } = await agreeAPI.put(
        {
          pointUuid: uuid,
          userUuid: '',
          status
        },
        token
      )
      setValue({
        ...storedValue,
        token: data?.retoken
      })
      update()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <Image
          src='https://fakeimg.pl/108x108/'
          layout='fixed'
          width='108'
          height='108'
          alt='user'
          className={styles.image}
        />
        <p>{nickname}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.main}>
        <div className='w-[10%] flex justify-center'>
          <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
            {point}
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-5'>
          <div className='flex items-center justify-between'>
            <h5 className='text-2xl font-semibold'>{chapter}</h5>
            {isOwn === 1 && (
              <div ref={wrapperRef}>
                <button
                  type='button'
                  className='rotate-90'
                  onClick={handleShowUpdate}
                >
                  <span className='text-2xl font-semibold'>...</span>
                </button>
                {showUpdate && (
                  <ul className='flex flex-col gap-y-2 border border-lightGrey rounded-lg shadow-2xl text-darkGrey p-6'>
                    <li
                      className='cursor-pointer border-b border-darkGrey pb-2'
                      onClick={handleEditComment}
                    >
                      修改評論
                    </li>
                    <li
                      className='cursor-pointer'
                      onClick={handleDeleteComment}
                    >
                      刪除評論
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          <p className='leading-9 w-[90%]'>{description}</p>
          <div
            className={classNames({
              'flex items-center': true,
              'justify-between': isThunder === 1,
              'justify-end': isThunder !== 1
            })}
          >
            {isThunder === 1 && (
              <p className='flex items-center gap-2'>
                <Image
                  src={explodeSVG}
                  layout='fixed'
                  width='36'
                  height='34'
                  alt='explode'
                />
                <span className='text-xl font-semibold text-mediumGrey'>
                  內有暴雷
                </span>
                <Image
                  src={explodeSVG}
                  layout='fixed'
                  width='36'
                  height='34'
                  alt='explode'
                />
              </p>
            )}
            <div className='flex items-center gap-10'>
              <Button
                number={disagree}
                text='不贊同'
                icon={<HiMinus size='24' />}
                atPress={() => handleAgree(0)}
              />
              <Button
                number={suspect}
                text='質疑'
                icon={<MdOutlineQuestionMark size='24' />}
                atPress={() => handleAgree(1)}
              />
              <Button
                number={agree}
                text='贊同'
                icon={<HiPlus size='24' />}
                atPress={() => handleAgree(2)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserComment }
