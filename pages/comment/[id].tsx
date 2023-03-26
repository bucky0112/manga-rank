import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './comment.module.scss'
import { Footer } from 'components'
import { Navbar } from 'components/user'
import Image from 'next/image'
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

const Page = () => {
  const router = useRouter()
  const id = router.query.id as string
  const [book, setBook] = useState<bookDetail>({} as bookDetail)
  const [commentState, setCommentState] = useState<MangaComment>({
    mangaUuid: '',
    chapter: '',
    point: 0,
    description: '',
    isThunder: 0
  })

  const {
    title_cn,
    episode
  } = book

  const { storedValue, setValue } = useStorage('userInfo', {})

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

  const handleInputChange = (text: string) => {
    updateCommentState('description', text)
  }

  const handlePointChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.value)
    updateCommentState('point', index + 1)
  }

  const fetchDetail = async () => {
    try {
      const { data } = await manga.getDetail(id)
      const { uuid, episode } = data?.data[0]
      setBook(data?.data[0])
      setCommentState({
        mangaUuid: uuid,
        chapter: episode[0],
        point: 0,
        description: '',
        isThunder: 0
      })
    } catch (err) {
      console.error(err)
    }
  }

  const newComment = async () => {
    try {
      const { data } = await comment.new(commentState, storedValue?.token)
      setValue({
        ...storedValue,
        token: data?.retoken
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetail()
    }
  }, [id])

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center px-60 2xl:px-36 xl:px-32 py-2 relative bg-mainBG overflow-x-hidden font-inter'>
        <div className='flex items-center basis-7/12'>
          <div className='flex h-[90%] w-[12%]  mt-[60px] mr-[96px]'>
            <div className='flex flex-col items-center gap-y-1'>
              <Image
                src='https://fakeimg.pl/108x108/'
                layout='fixed'
                width='108'
                height='108'
                alt='user'
                className='rounded-full'
              />
              <p className='text-2xl font-semibold tracking-wider'>Mary</p>
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-5'>
            <div className='flex flex-col ml-5 pt-12 pb-8 w-full mt-[2rem]'>
              <div className='flex items-center'>
                <h4 className='text-base pr-[37px] font-semibold tracking-wider'>
                  作品名稱
                </h4>
                <p className={styles.titleBox}>{title_cn}</p>
              </div>
              <select
                className={styles.selection}
                onChange={(e) => handleOptionChange('chapter', e.target.value)}
              >
                {episode?.map((item, index) => (
                  <option key={item} value={`第${index + 1}集`}>
                    {`第${index + 1}集`}
                  </option>
                ))}
              </select>
              <div className='w-[933px] h-[83px] flex justify-start items-center gap-[38px] border-l-[1px] border-[#7a7a7a] pl-2'>
                <p className='font-bold text-darkGrey text-center ml-6'>評分</p>
                <div className='flex item-center gap-x-10'>
                  {[...Array(10)].map((_, i) => (
                    <button
                      type='button'
                      className={styles.score}
                      key={i}
                      value={i}
                      onClick={handlePointChange}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type='button'
                className='flex justify-center items-center ml-4 font-semibold text-base text-darkGry w-[102px] h-[50px] bg-lightGrey rounded-full my-[49px]'
                onClick={() => handleIsSpoiler(commentState?.isThunder ? 0 : 1)}
              >
                爆雷上標
              </button>
              <div className='flex border-t-2 border-r-2 border-gray-400 rounded-r-3xl rounded-b-none text-[#3E3E3E]leading-tight w-[943px]'>
                <input
                  type='text'
                  value={commentState?.description}
                  className='leading-9 mt-[54px] mx-[46px] font-normal text-base bg-mainBG border-0 focus:outline-none'
                  placeholder='請輸入評論'
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </div>
              <div className='flex justify-center mt-[71px] gap-[239px]'>
                <button type='button' className={styles.commentBtn}>
                  取消評論
                </button>
                <button type='button' className={styles.commentBtn} onClick={newComment}>
                  確認評論
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
