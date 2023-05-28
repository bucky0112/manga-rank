import { FC, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import explodeSVG from 'public/svg/explode.svg'
import { useAppDispatch } from 'store/hooks'
import {
  setEditPermission,
  setCommentDetail,
  setDeletePermission
} from 'store/feat/user/commentSlice'

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
}

const UserComment: FC<Props> = ({ state }) => {
  const {
    chapter,
    description,
    isOwn,
    isThunder,
    mangaUuid,
    point,
    uuid,
    nickname,
    bookTitle
  } = state
  const dispatch = useAppDispatch()

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

  return (
    <div className='flex items-center border border-lightGrey px-14 rounded-3xl shadow-2xl w-full pt-12 pb-8'>
      <div className='flex flex-col items-center gap-y-1'>
        <Image
          src='https://fakeimg.pl/108x108/'
          layout='fixed'
          width='108'
          height='108'
          alt='user'
          className='rounded-full'
        />
        <p className='text-2xl font-semibold'>{nickname}</p>
      </div>
      <div className='w-[1px] h-28 bg-[#7a7a7a] relative left-5' />
      <div className='flex items-center pt-12 pb-8 w-full'>
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
              <button
                type='button'
                className='flex items-center justify-center gap-1 bg-[#f1f1f1] text-darkGrey w-28 h-12 rounded-full'
              >
                <Image
                  src='/svg/minus.svg'
                  layout='fixed'
                  width='18'
                  height='4'
                  alt='not'
                />
                <span>不贊同</span>
              </button>
              <button
                type='button'
                className='flex items-center justify-center gap-1 bg-[#f1f1f1] text-darkGrey w-28 h-12 rounded-full'
              >
                <Image
                  src='/svg/question.svg'
                  layout='fixed'
                  width='11'
                  height='20'
                  alt='question'
                />
                <span>質疑</span>
              </button>
              <button
                type='button'
                className='flex items-center justify-center gap-1 bg-[#f1f1f1] text-darkGrey w-28 h-12 rounded-full'
              >
                <Image
                  src='/svg/right_arrow.svg'
                  layout='fixed'
                  width='20'
                  height='20'
                  alt='agree'
                />
                <span>贊同</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserComment }
