import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const Page = () => {
  const router = useRouter()
  const [id, setId] = useState<string>("")

  useEffect(() => {
    setId(router.query.id as string)
  }, [router.query.id])

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className='flex items-center basis-7/12'>
          <div className="flex h-[90%] w-[12%]">
            <div className='flex flex-col items-center gap-y-1'>
              <Image
                src='https://fakeimg.pl/108x108/'
                layout='fixed'
                width='108'
                height='108'
                alt='user'
                className='rounded-full'
              />
              <p className='text-2xl font-semibold'>Mary</p>
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-5'>
            <div className='flex flex-col ml-5 pt-12 pb-8 w-full'>
              <div className="flex items-center">
                <h4 className='pr-8 text-base'>作品名稱</h4>
                <p className='border rounded-3xl bg-lightGrey ml-8 font-semibold text-2xl p-2 pl-4 w-[630px] h-[50px]'>間諜家家酒 Spy x Family</p>
                <div className="flex ml-8">
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
                    <p className='text-darkGrey'>NEW</p>
                  </div>
                </div>
              </div>
              <select className='bg-lightGrey w-60 h-[50px] m-5 rounded-3xl font-semibold text-base p-4'>
                <option value='1'>第一集</option>
              </select>
              <div className='w-[90%] flex justify-start gap-12 h-3'>
                <div className='w-[1px] h-14 bg-[#7a7a7a] relative left-5' />
                <p className='flex justify-center items-center w-11 h-11 font-bold ml-5'>
                  評分
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  1
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  2
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-primary text-4xl text-darkGrey'>
                  3
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  4
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  6
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  7
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  8
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  9
                </p>
                <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
                  10
                </p>
              </div>
              <div className="flex">
                <h4 className='flex justify-center items-center w-20 h-11 rounded-full bg-lightGrey font-semibold text-base text-darkGrey mb-3 mt-16'>
                  暴雷上標
                </h4>
              </div>
              <div className='col-span-2'>
                <div className='flex flex-col p-6 border-t-2 border-r-2 border-gray-400 rounded-r-3xl rounded-b-none text-darkGrey leading-tight'>
                  <p className='self-end leading-9 m-6 font-normal text-base'>上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不</p>
                </div>
              </div>
              <div className='flex justify-center'>
                <button type="button" className='bg-lightGrey w-[113px] h-[68px] m-5 rounded-[50px] font-semibold text-xl p-4'>取消評論</button>
                <button type="button" className='bg-lightGrey w-[113px] h-[68px] m-5 rounded-[50px] font-semibold text-xl p-4'>確認評論</button>
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
