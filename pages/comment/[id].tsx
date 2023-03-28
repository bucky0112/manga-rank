import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './comment.module.scss'
import { CommentFooter } from './CommentFooter'
import { Navbar } from '../../components/user/'
import Image from 'next/image'
import { Select, MenuItem, Autocomplete, TextField, TextareaAutosize } from '@mui/material/'

const testData = [
  { title: '間諜家家酒 Spy x Family', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather', year: 1972 }
]

const Page = () => {
  const router = useRouter()
  const [id, setId] = useState<string>('')

  useEffect(() => {
    setId(router.query.id as string)
  }, [router.query.id])

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className='flex flex-row justify-between basis-[1150px] mt-[39px]'>
          <div className="flex">
            <div>
              <Image
                src='https://fakeimg.pl/108x108/'
                layout='fixed'
                width='108'
                height='108'
                alt='user'
                className='rounded-full'
              />
              <p className='text-2xl text-center font-semibold tracking-wider'>Mary</p>
            </div>
          </div>
          <div className='flex flex-col w-[943px]'>
            <div className='flex flex-col w-full'>
              <div className="flex items-center">
                <h4 className='text-base pr-[37px] font-semibold tracking-wider'>作品名稱</h4>
                <input type='search' className={styles.titleBox} value='間諜家家酒 Spy x Family' />
              </div>
              <Select variant="standard" className={styles.selection} value='1'>
                <MenuItem className='font-semibold' value='1'>第一集</MenuItem>
              </Select>
              <div className='h-[83px] w-full grid grid-cols-11 justify-end items-center border-l-[1px] border-[#3E3E3E] pl-2'>
                <h4 className='font-[850] text-[#3E3E3E text-center'>
                  評分
                </h4>
                <div className={styles.score}>
                  <button>
                    1
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    2
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    3
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    4
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    5
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    6
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    7
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    8
                  </button>
                </div>
                <div className={styles.score}>
                  <button>
                    9
                  </button>
                </div>
                <div className='flex justify-end'>
                  <button className='flex justify-center items-center w-[46px] h-[46px] rounded-full bg-lightGrey text-[32px] text-darkGrey tracking-[-0.1rem] pl-[25px]'>10　</button>
                </div>
              </div>
              <div className="flex w-[111px] h-[50px] bg-[#E7E7E7] mt-[33px] mb-[48px] rounded-full">
                <h4 className='w-[111px] leading-[50px] text-center font-semibold text-base text-[#333333]'>
                  爆雷上標
                </h4>
              </div>
              <div className='w-[943px] min-h-[253px] flex flex-col border-t border-r border-gray-400 rounded-r-3xl rounded-b-none text-[#3E3E3E]leading-tight'>
                <textarea required placeholder='請輸入文字...' className={styles.textAreaBox}></textarea>
              </div>
              <div className='flex justify-center mt-[47px] mb-[74px] gap-[239px]'>
                <button type="button" className={styles.commentBtn}>取消評論</button>
                <button type="button" className={styles.commentBtn}>確認評論</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentFooter />
    </>
  )
}

export default Page
