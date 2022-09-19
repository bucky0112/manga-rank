import { useRouter } from 'next/router'
import Image from 'next/image'
import { UserComment } from '../../components/book'

const Page = () => {
  /*const router = useRouter()
  const { id } = router.query*/
  return (
    <main className='max-w-screen-2xl px-60 py-52'>
      <div className='grid grid-cols-7 gap-x-10'>
        <div className='col-span-2'>
          <Image
            src='https://fakeimg.pl/390x550/'
            layout='intrinsic'
            width='390'
            height='550'
            alt='mockBook'
            className='rounded-3xl object-cover'
          />
        </div>
        <div className='col-span-3'>
          <h3 className='text-2xl font-semibold mb-5'>
            間諜家家酒 Spy x Family
          </h3>
          <ul className='flex flex-col gap-1 leading-9'>
            <li>
              <p>作者：遠藤達哉</p>
            </li>
            <li>
              <p>譯者：陳姿君</p>
            </li>
            <li>
              <p>出版社：東立</p>
            </li>
            <li>
              <p className='flex flex-col gap-1'>
                <span>最新出版日期：</span>
                <span>2020/01/16</span>
              </p>
            </li>
            <li>
              <p>語言：繁體中文</p>
            </li>
            <li>
              <p>定價：110元/本</p>
            </li>
            <li>
              <p className='flex flex-col gap-1 mt-8'>
                <span>簡介：</span>
                <span>
                  《間諜家家酒》是由日本漫畫家遠藤達哉所創作的作品，在2019年3月25日起於日本《少年Jump+》上定期連載，台灣於《寶島少年EX》上連載。本作敘述一名身为間諜的男性、另一位工作是殺手的女性，以及一个能讀心的超能力者女孩，三人互相隱瞞真實身份所组成的虚假家庭間的家庭喜剧。
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div className='col-span-2'>
          <div className='flex flex-col p-6 border-t-2 border-r-2 border-darkGrey rounded-r-3xl rounded-b-none text-darkGrey leading-tight'>
            <p className='text-xl'>平均評分</p>
            <p className='text-[12rem] self-end'>5.9</p>
            <p className='self-end'>/300人</p>
          </div>
        </div>
      </div>

      <div>
        <UserComment />
      </div>
    </main>
  )
}

export default Page
