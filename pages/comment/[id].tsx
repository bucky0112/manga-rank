import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import styles from 'styles/comment.module.scss'
import { Navbar, Footer } from 'components'
import { SideBar, TipsModal } from 'components/shared'
import { manga } from 'lib/api/manga'
import { comment } from 'lib/api/comment'
import { useStorage } from 'lib/hooks'
import { useAppSelector } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import { AiOutlineCheck } from 'react-icons/ai'

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

  const handelCancel = () => {
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

  // const toggleModal = (isVisible: boolean) => {
  //   setShowModal(isVisible)
  // }

  const newComment = async () => {
    const updatedCommentState = {
      ...commentState,
      point: pointState,
      description: descriptionState
    }

    try {
      const { data } = await comment.new(
        updatedCommentState,
        storedValue?.token
      )
      setValue({
        ...storedValue,
        token: data?.retoken
      })
      setShowModal({
        ...showModal,
        success: true,
      })
      setTimeout(() => {
        setShowModal({
          ...showModal,
          success: false,
        })
        router.push(`/book/${uuid}`)
      }, 3000)
    } catch (_) {
      setShowModal({
        ...showModal,
        fail: true,
      })
      setTimeout(() => {
        setShowModal({
          ...showModal,
          fail: false,
        })
      }, 3000)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetail()
    }
  }, [id])

  return (
    <>
      <Navbar isOpen={isOpen} />
      <div className='flex flex-col px-60 2xl:px-[15%] xl:px-12 lg:px-10 py-2 relative bg-mainBG font-inter overflow-hidden'>
        <SideBar isOpen={isOpen} />
        {showModal.success && <TipsModal text='評論成功！' />}
        {showModal.fail && <TipsModal text='好像伺服器出了一點錯，請重新點選下方「確認評論」' />}
        <div className='flex items-start basis-7/12 xl:basis-10/12'>
          <form
            onSubmit={handleSubmit(newComment)}
            className='flex flex-col ml-5 pt-12 pb-8 w-full'
          >
            <div className='flex'>
              <div className='flex h-[90%] w-[12%] mt-[40px] mr-[96px]'>
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
              <div className='flex flex-col mx-5 pt-4 pb-8 w-full'>
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
                >
                  {episode?.length > 0 ? (
                    episode.map((item, index) => (
                      <option key={item} value={`第${index + 1}集`}>
                        {`第${index + 1}集`}
                      </option>
                    ))
                  ) : (
                    <option value='第1集'>第1集</option>
                  )}
                </select>
                <div className='h-[83px] flex justify-start items-center gap-[38px] border-l-[1px] border-[#7a7a7a] pl-2'>
                  <p className='font-bold text-darkGrey text-center ml-6 whitespace-nowrap'>評分</p>
                  <div className='flex item-center gap-x-10'>
                    {[...Array(10)].map((_, i) => (
                      <button
                        type='button'
                        className={classNames({
                          'flex justify-center items-center w-[46px] h-[46px] rounded-full text-4xl text-darkGrey':
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
                    'flex justify-center items-center font-semibold text-base text-darkGry h-[50px] rounded-full my-[49px] gap-5':
                      true,
                    'bg-lightGrey w-[111px]': commentState?.isThunder === 0,
                    'bg-primary w-[144px]': commentState?.isThunder === 1
                  })}
                  onClick={() => handleIsSpoiler(commentState?.isThunder ? 0 : 1)}
                >
                  爆雷上標<AiOutlineCheck className={classNames({
                    'hidden': commentState?.isThunder === 0,
                    'flex': commentState?.isThunder === 1
                  })} />
                </button>
                <div className='flex border-t-2 border-r-2 border-gray-400 rounded-t-3xl rounded-l-none rounded-b-none text-[#3E3E3E] leading-tight'>
                  <textarea
                    {...register('description', { required: true, minLength: 1 })}
                    className={styles.textMain}
                    placeholder='打下你對作品的評論吧！'
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center gap-[239px] pb-[50px]'>
              <button
                type='button'
                className={styles.commentBtn}
                onClick={handelCancel}
              >
                取消評論
              </button>
              <input
                type='submit'
                className={styles.commentBtn}
                value='確認評論'
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
