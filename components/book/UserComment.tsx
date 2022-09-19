import Image from "next/image"
import explodeSVG from '../../public/svg/explode.svg'

const UserComment = () => {
  return (
    <div>
      <Image
        src='https://fakeimg.pl/108x108/'
        layout='fixed'
        width='108'
        height='108'
        alt='user'
        className='rounded-full'
      />
      <p>3</p>
      <div>
        <div>
          <h5>第三卷 25集</h5>
          <button type='button'>...</button>
        </div>
        <p>
          上有水，定即用把於來速案進入親覺試產傳代體英三，相的行因港；此一爭細岸時難操聽外至山的國雨。有個收交觀現不來，物民傷未力歷他自稱風他口意運馬海活各方望送起然，廣對道車希原創想作看海也科山神別內參火也少：建一創相，我當行趣表那遠錢，性展然時們在中斷團不。...
        </p>
        <div>
          <p>
            <Image
              src={explodeSVG}
              layout='fixed'
              width='36'
              height='34'
              alt='explode'
            />
            內有暴雷
            <Image
              src={explodeSVG}
              layout='fixed'
              width='36'
              height='34'
              alt='explode'
            />
          </p>
          <div>
            <button type='button'>
              <Image
                src='/svg/minus.svg'
                layout='fixed'
                width='18'
                height='4'
                alt='not'
              />
              不贊同
            </button>
            <button type='button'>
              <Image
                src='/svg/question.svg'
                layout='fixed'
                width='11'
                height='20'
                alt='question'
              />
              質疑
            </button>
            <button type='button'>
              <Image
                src='/svg/right_arrow.svg'
                layout='fixed'
                width='20'
                height='20'
                alt='agree'
              />
              贊同
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserComment }