import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import styles from 'styles/comment.module.scss'
import { Navbar, Footer } from 'components'
import { SideBar, TipsModal, ConfirmModal } from 'components/shared'
import { manga } from 'lib/api/manga'
import { comment } from 'lib/api/comment'
import { useStorage } from 'lib/hooks'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import {
  selectEditPermission,
  selectCommentDetail,
  selectCancelEditPermission,
  setCancelEditPermission
} from 'store/feat/user/commentSlice'

interface bookDetail {
  author: string
  create_time: string
  description: string
  image: string
  is_adult: number
  publisher: string
  tag: string
  title_cn: string
  point: number
  episode: string[]
  uuid: string
}

interface MangaComment {
  mangaUuid: string
  chapter: string
  point: number
  description: string
  isThunder: number
}

type Inputs = {
  chapter: string
  point: number
  description: string
  isThunder: number
}

const Page = () => {
  const router = useRouter()
  const id = router.query.id as string
  const isOpen = useAppSelector(selectSideBarOpen)
  const isEditPermission = useAppSelector(selectEditPermission)
  const commentDetail = useAppSelector(selectCommentDetail)
  const { description, isThunder, point, chapter, bookTitle, mangaUuid } =
    commentDetail
  const [showModal, setShowModal] = useState({
    success: false,
    fail: false
  })
  const [book, setBook] = useState<bookDetail>({} as bookDetail)
  const [commentState, setCommentState] = useState<MangaComment>({
    mangaUuid: '',
    chapter: '',
    point: 0,
    description: '',
    isThunder: 0
  })

  const { title_cn, episode, uuid } = book

  const { storedValue, setValue } = useStorage('userInfo', {})

  const {
    register,
    handleSubmit,
    watch,
    setValue: setFormValue,
    formState: { errors }
  } = useForm<Inputs>()

  const pointState = watch('point')
  const descriptionState = watch('description')
  const isThunderState = watch('isThunder')

  const updateCommentState = (key: string, value: string | number) => {
    setCommentState((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleOptionChange = (key: string, e: string) => {
    updateCommentState(key, e)
  }

  const handleIsSpoiler = (state: number) => {
    updateCommentState('isThunder', state)
  }

  const handlePointChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(
      event.currentTarget.getAttribute('data-value') as string,
      10
    )
    setFormValue('point', index + 1)
  }

  const isCancelVisible = useAppSelector(selectCancelEditPermission)
  const dispatch = useAppDispatch()

  const handleCancelEditComment = () => {
    dispatch(setCancelEditPermission(false))
    router.back()
  }

  const handleContinueEditComment = () => {
    dispatch(setCancelEditPermission(false))
  }

  const handelCancel = () => {
    dispatch(setCancelEditPermission(true))
    setCommentState({
      ...commentState,
      point: 0,
      description: '',
      isThunder: 0
    })
  }

  const fetchDetail = async () => {
    try {
      const { data } = await manga.getDetail(id)
      const { uuid, episode } = data?.data[0]
      setBook(data?.data[0])
      setCommentState({
        mangaUuid: uuid,
        chapter: episode ? episode[0] : '第1集',
        point: 0,
        description: '',
        isThunder: 0
      })
    } catch (err) {
      console.error(err)
    }
  }

  const newComment = async () => {
    const updatedCommentState = {
      ...commentState,
      point: pointState,
      description: descriptionState
    }

    try {
      let apiResponse
      if (isEditPermission) {
        apiResponse = await comment.update(
          {
            uuid: id,
            point: pointState,
            description: descriptionState,
            chapter: chapter!,
            isThunder: isThunderState
          },
          storedValue?.token
        )
      } else {
        apiResponse = await comment.new(updatedCommentState, storedValue?.token)
      }
      const { data } = apiResponse
      setValue({
        ...storedValue,
        token: data?.retoken
      })
      setShowModal({
        ...showModal,
        success: true
      })
      setTimeout(() => {
        setShowModal({
          ...showModal,
          success: false
        })
        if (isEditPermission) {
          router.push(`/book/${mangaUuid}`)
        } else {
          router.push(`/book/${id}`)
        }
      }, 3000)
    } catch (_) {
      setShowModal({
        ...showModal,
        fail: true
      })
      setTimeout(() => {
        setShowModal({
          ...showModal,
          fail: false
        })
      }, 3000)
    }
  }

  useEffect(() => {
    if (isEditPermission) {
      setFormValue('point', Number(point))
      setFormValue('description', description ?? '')
      setFormValue('isThunder', isThunder ?? 0)
      setFormValue('chapter', chapter ?? '')
      setBook({
        ...book,
        title_cn: bookTitle ?? ''
      })
    } else {
      fetchDetail()
    }
  }, [id, isEditPermission])

  return (
    <>
      <ConfirmModal
        title='你確定要放棄此次修改嗎？'
        cancelText='確認並回上一頁'
        continueText='繼續修改'
        visible={isCancelVisible}
        onCancel={handleCancelEditComment}
        onContinue={handleContinueEditComment}
      />
      <Navbar isOpen={isOpen} />
      <div className='flex flex-col justify-center items-center px-60 2xl:px-36 xl:px-32 py-2 relative bg-mainBG font-inter overflow-hidden'>
        <SideBar isOpen={isOpen} />
        {showModal.success && <TipsModal text='評論成功！' />}
        {showModal.fail && (
          <TipsModal text='好像伺服器出了一點錯，請重新點選下方「確認評論」' />
        )}
        <div className='flex items-start basis-7/12'>
          <div className='flex h-[90%] w-[12%] mt-[80px] mr-[96px]'>
            <div className='flex flex-col items-center gap-y-1'>
              <Image
                src='https://fakeimg.pl/108x108/'
                layout='fixed'
                width='108'
                height='108'
                alt='user'
                className='rounded-full'
              />
              <p className='text-2xl font-semibold tracking-wider'>
                {storedValue?.nickname}
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(newComment)}
            className='flex flex-col ml-5 pt-12 pb-8 w-full mt-[2rem]'
          >
            <div className='flex items-center'>
              <h4 className='text-base pr-[37px] font-semibold tracking-wider'>
                作品名稱
              </h4>
              <p className={styles.titleBox}>{title_cn}</p>
            </div>
            <select
              {...register('chapter')}
              className={styles.selection}
              onChange={(e) => handleOptionChange('chapter', e.target.value)}
              disabled={isEditPermission || !episode?.length}
            >
              {isEditPermission ? (
                <option value={chapter}>{chapter}</option>
              ) : episode?.length > 0 ? (
                episode.map((item, index) => (
                  <option key={item} value={`第${index + 1}集`}>
                    {`第${index + 1}集`}
                  </option>
                ))
              ) : (
                <option value='第1集'>第1集</option>
              )}
            </select>
            <div className='w-[933px] h-[83px] flex justify-start items-center gap-[38px] border-l-[1px] border-[#7a7a7a] pl-2'>
              <p className='font-bold text-darkGrey text-center ml-6'>評分</p>
              <div className='flex item-center gap-x-10'>
                {[...Array(10)].map((_, i) => (
                  <button
                    type='button'
                    className={classNames({
                      'flex justify-center items-center w-[46px] h-[46px] rounded-full text-4xl text-darkGrey hover:bg-primary':
                        true,
                      'bg-lightGrey': pointState !== i + 1,
                      'bg-primary': pointState === i + 1
                    })}
                    key={i}
                    data-value={i}
                    onClick={handlePointChange}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <button
              type='button'
              {...register('isThunder')}
              className={classNames({
                'flex justify-center items-center ml-4 font-semibold text-base text-darkGry w-[102px] h-[50px] rounded-full my-[49px] hover:bg-primary':
                  true,
                'bg-lightGrey': commentState?.isThunder === 0,
                'bg-primary': commentState?.isThunder === 1
              })}
              onClick={() => handleIsSpoiler(commentState?.isThunder ? 0 : 1)}
            >
              爆雷上標
            </button>
            <div className='flex border-t-2 border-r-2 border-gray-400 rounded-t-3xl rounded-l-none rounded-b-none text-[#3E3E3E] leading-tight'>
              <textarea
                {...register('description', { required: true, minLength: 1 })}
                className='leading-9 w-full mt-8 mx-[46px] font-normal text-base bg-mainBG border-0 focus:outline-none'
                placeholder='打下你對作品的評論吧！'
              />
            </div>
            <div className='flex justify-center gap-[239px]'>
              <button
                type='button'
                className={styles.commentBtn}
                onClick={handelCancel}
              >
                {isEditPermission ? '取消修改' : '取消評論'}
              </button>
              <input
                type='submit'
                className={styles.commentBtn}
                value={isEditPermission ? '確認修改' : '確認評論'}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
