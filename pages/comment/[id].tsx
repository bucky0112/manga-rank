import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './comment.module.scss'
import { Footer } from '../../components'
import { Navbar } from '../../components/user/'
import Image from 'next/image'
import { Select, MenuItem, Autocomplete, TextField } from '@mui/material/'

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
        <div className='flex items-center basis-7/12'>
          <div className="flex h-[90%] w-[12%]  mt-[60px] mr-[96px]">
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
              <div className="flex items-center">
                <h4 className='text-base pr-[37px] font-semibold tracking-wider'>作品名稱</h4>
                {/* <Autocomplete
                  id="free-solo-demo"
                  className={styles.titleBox}
                  freeSolo
                  options={testData.map((option) => option.title)}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
                <input type='search' className={styles.titleBox} value='間諜家家酒 Spy x Family'  />
                {/* <input type='search' value='間諜家家酒 Spy x Family' className={styles.titleBox} /> */}
                {/* <div className="flex ml-8">
                  <div className='row-span-full'>
                    <Image
                      src='/svg/star2.svg'
                      layout='fixed'
                      width='110'
                      height='110'
                      alt='new star'
                    />
                  </div>
                  <div className='absolute justify-self-center self-center ml-9'>
                    <p className='text-darkGrey text-base font-semibold tracking-wider'>NEW</p>
                  </div>
                </div> */}
              </div>
              <Select variant="standard" className={styles.selection} value='1'>
                <MenuItem className='font-semibold' value='1'>第一集</MenuItem>
              </Select>
              <div className='w-[933px] h-[83px] flex justify-start items-center gap-[38px] border-l-[1px] border-[#7a7a7a] pl-2'>
                <p className='w-[71px] h-[33px] font-bold text-[#333333] text-center'>
                  評分
                </p>
                <button className={styles.score}>
                  1
                </button>
                <button className={styles.score}>
                  2
                </button>
                <button className={styles.score}>
                  3
                </button>
                <button className={styles.score}>
                  4
                </button>
                <button className={styles.score}>
                  5
                </button>
                <button className={styles.score}>
                  6
                </button>
                <button className={styles.score}>
                  7
                </button>
                <button className={styles.score}>
                  8
                </button>
                <button className={styles.score}>
                  9
                </button>
                <button className='flex justify-center items-center w-[46px] h-[46px] rounded-full bg-lightGrey text-[32px] text-darkGrey tracking-[-0.1rem] pl-[25px]'>10　</button>
              </div>
              <div className="flex w-[102px] h-[50px] bg-lightGrey my-[49px] rounded-full">
                <h4 className='justify-center items-center mt-3 ml-4 font-semibold text-base text-darkGry'>
                  爆雷上標
                </h4>
              </div>
              <div className='col-span-2 w-[943px]'>
                <div className='flex flex-col border-t-2 border-r-2 border-gray-400 rounded-r-3xl rounded-b-none text-[#3E3E3E]leading-tight'>
                  <p className='self-end leading-9 mt-[54px] mx-[46px] font-normal text-base'>上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。上有少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在</p>
                </div>
              </div>
              <div className='flex justify-center mt-[71px] gap-[239px]'>
                <button type="button" className={styles.commentBtn}>取消評論</button>
                <button type="button" className={styles.commentBtn}>確認評論</button>
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
