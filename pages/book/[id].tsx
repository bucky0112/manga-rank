import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { Navbar, Footer } from 'components'
import { SideBar, ConfirmModal, TipsModal } from 'components/shared'
import { UserComment, Another, AgeTips } from 'components/book'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { selectSideBarOpen } from 'store/feat/share/sideBarSlice'
import {
  selectDeletePermission,
  setDeletePermission,
  selectCommentDetail
} from 'store/feat/user/commentSlice'
import { manga } from 'lib/api/manga'
import { comment } from 'lib/api/comment'
import { useStorage } from 'lib/hooks'

interface bookDetail {
  author: string
  create_time: string
  description: string
  image: string
  is_adult: number
  publisher: string
  tag: string
  title_cn: string
  point: string
}

interface Comment {
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
}

interface Tag {
  id: string
  name: string
}

const Page = () => {
  const router = useRouter()
  const id = router.query.id as string

  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectSideBarOpen)
  const isDeleteVisible = useAppSelector(selectDeletePermission)
  const commentDetail = useAppSelector(selectCommentDetail)
  const { uuid } = commentDetail
  const { storedValue } = useStorage('userInfo', {})
  const token = storedValue?.token || ''

  const [book, setBook] = useState<bookDetail>({} as bookDetail)
  const [comments, setComments] = useState<Comment[]>([])
  const [isAdult, setIsAdult] = useState(false)
  const [showModal, setShowModal] = useState({
    success: false,
    fail: false
  })
  const [updateAgree, setUpdateAgree] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [showAllTags, setShowAllTags] = useState<boolean>(false)
  const {
    author,
    description,
    image,
    is_adult,
    publisher,
    title_cn,
    point,
    tag
  } = book

  const fetchDetail = async () => {
    try {
      const { data } = await manga.getDetail(id)
      setBook(data?.data[0])
    } catch (err) {
      console.error(err)
    }
  }

  const fetchComment = async () => {
    try {
      const { data } = await comment.getComments(id, token)
      setComments(data?.data)
      setUpdateAgree(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetail()
      fetchComment()
    }

    if (updateAgree) {
      fetchComment()
    }
  }, [id, updateAgree])

  useEffect(() => {
    setIsAdult(is_adult === 1)
    const tagArr = tag?.split(',').map((item) => {
      let parts = item.split('§')
      return {
        id: parts[0],
        name: parts[1]
      }
    })
    setTags(tagArr)
  }, [book])

  const pointToFixed = (point: string) => {
    const pointToNumber = Number(point)
    if (pointToNumber % 1 !== 0) {
      return pointToNumber.toFixed(2)
    } else {
      return pointToNumber.toFixed(0)
    }
  }

  const handleCancelDeleteComment = () => {
    dispatch(setDeletePermission(false))
  }

  const handleDeleteComment = async () => {
    dispatch(setDeletePermission(false))
    try {
      await comment.delete(uuid!, token)
      setShowModal({
        ...showModal,
        success: true
      })
      setTimeout(() => {
        setShowModal({
          ...showModal,
          success: false
        })
        router.reload()
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

  return (
    <>
      <ConfirmModal
        title='你確定要刪除此評論嗎？'
        cancelText='不要刪除'
        continueText='確認刪除'
        visible={isDeleteVisible}
        onCancel={handleCancelDeleteComment}
        onContinue={handleDeleteComment}
      />
      <Navbar isOpen={isOpen} />
      <main className='flex flex-col justify-center items-center px-60 2xl:px-36 xl:px-32 py-52 relative bg-mainBG overflow-x-hidden font-inter'>
        <SideBar isOpen={isOpen} />
        {showModal.success && <TipsModal text='刪除成功！' />}
        {showModal.fail && (
          <TipsModal text='好像伺服器出了一點錯，請重新點選「刪除評論」' />
        )}
        {isAdult && (
          <AgeTips isOpen={isAdult} atClose={() => setIsAdult(false)} />
        )}
        <div className='grid grid-cols-7 xl:grid-cols-3 gap-x-10'>
          <div className='col-span-2 xl:col-span-1'>
            {image && (
              <Image
                src={image}
                layout='intrinsic'
                width='390'
                height='550'
                alt={title_cn}
                className='rounded-3xl object-cover w-[390px] xl:w-[326px] h-[550px] xl:h-[460px]'
              />
            )}
          </div>
          <div className='col-span-3 xl:col-span-1'>
            <h3 className='text-2xl font-semibold mb-5'>{title_cn}</h3>
            <ul className='flex flex-col gap-1 leading-9'>
              <li>
                <p>作者：{author}</p>
              </li>
              <li>
                <p>出版社：{publisher}</p>
              </li>
              <li>
                <p>語言：繁體中文</p>
              </li>
              <li>
                <p className='flex flex-col gap-1 mt-8'>
                  <span>簡介：</span>
                  <span>{description}</span>
                </p>
              </li>
            </ul>
          </div>
          <div className='col-span-2 xl:col-span-1'>
            <div className='flex flex-col p-6 border-t-2 border-r-2 border-darkGrey rounded-r-3xl rounded-b-none text-darkGrey leading-tight'>
              <p className='text-xl'>平均評分</p>
              <p className='text-[12.5rem] xl:text-[10.5rem] self-end'>
                {pointToFixed(point)}
              </p>
              <p className='self-end text-lg'>/300人</p>
            </div>
          </div>
        </div>
        <div className='bg-white self-start rounded-2xl flex items-center px-12 py-4 mt-10'>
          <ul className='flex items-center gap-x-5 text-darkGrey'>
            {(showAllTags ? tags : tags?.slice(0, 5))?.map((item) => (
              <li className='bg-lightGrey rounded-full px-4 py-0' key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
          {showAllTags ? (
            <button
              type='button'
              className='bg-lightGrey p-1 rounded-full ml-5'
              onClick={() => setShowAllTags(false)}
            >
              <AiOutlineLeft className='text-darkGrey' />
            </button>
          ) : (
            <button
              type='button'
              className='bg-lightGrey p-1 rounded-full ml-5'
              onClick={() => setShowAllTags(true)}
            >
              <AiOutlineRight className='text-darkGrey' />
            </button>
          )}
        </div>
        <div
          className='right-2 top-[600px] cursor-pointer fixed'
          onClick={() => router.push(`/comment/${id}`)}
        >
          <div className='relative grid grid-rows-3'>
            <div className='row-span-full w-36 h-36'>
              <Image
                src='/svg/explode.svg'
                layout='fixed'
                width='144'
                height='144'
                alt='common button'
              />
            </div>
            <div className='absolute row-start-2 row-end-3 justify-self-center -mt-2'>
              <Image
                src='/svg/pen.svg'
                width='40'
                height='57'
                layout='intrinsic'
                alt='common'
              />
            </div>
            <div className='absolute row-start-3 row-end-4 justify-self-center -mt-2'>
              <p className='text-darkGrey text-sm'>我要評論</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-20 mt-36 mb-32 w-full'>
          <div className='self-start -mt-24 -mb-10'>
            <span className='bg-darkGrey text-primary py-1 px-4 rounded-full mr-16 leading-5'>
              評論
            </span>
            <select className='bg-mediumGrey text-white py-1 px-4 rounded-full appearance-none leading-5'>
              <option value=''>集數 All</option>
            </select>
          </div>
          {comments?.map((comment) => (
            <UserComment
              key={comment.uuid}
              state={{ ...comment, bookTitle: title_cn }}
              update={() => setUpdateAgree(true)}
            />
          ))}
        </div>
        <Another />
      </main>
      <Footer />
    </>
  )
}

export default Page
