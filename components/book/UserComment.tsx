import Image from 'next/image'
import explodeSVG from '../../public/svg/explode.svg'

const UserComment = () => {
  return (
    <div className='flex items-center border border-lightGrey px-14 rounded-3xl shadow-2xl'>
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
      <div className='w-[1px] h-28 bg-[#7a7a7a] relative left-5' />
      <div className='flex items-center pt-12 pb-8 w-full'>
        <div className='w-full flex justify-center'>
          <p className='flex justify-center items-center w-11 h-11 rounded-full bg-lightGrey text-4xl text-darkGrey'>
            3
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-5'>
          <div className='flex items-center justify-between text-2xl font-semibold'>
            <h5>第三卷 25集</h5>
            <button type='button' className='rotate-90'>
              <span>...</span>
            </button>
          </div>
          <p className='leading-9 w-[946px]'>
            上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。...
          </p>
          <div className='flex items-center justify-between'>
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
