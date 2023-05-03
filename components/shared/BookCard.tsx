import Image from 'next/image'
import { useRouter } from 'next/router'

interface bookTag {
  uuid: string
  name: string
}

interface books {
  title: string
  cover: string
  tag: bookTag[]
  uuid: string
  isAdult: boolean
  point: string
}

const BookCard = ({ ...rest }: books) => {
  const { title, cover, tag, uuid, isAdult, point } = rest

  const router = useRouter()

  return (
    <>
      <div
        className='relative w-full h-full cursor-pointer'
        onClick={() => router.push(`/book/${uuid}`)}
      >
        <div className='rounded-3xl relative w-[175px] h-[246px]'>
          <Image
            layout='fill'
            objectFit='cover'
            src={cover}
            alt={title}
            className='rounded-3xl absolute'
          />
          {isAdult && (
            <div className='absolute inset-0 backdrop-blur rounded-3xl flex items-center justify-center'>
              <Image
                layout='intrinsic'
                width={200}
                height={220}
                src='/svg/r18Cover.svg'
                alt='r18 cover'
                className='rounded-3xl'
              />
            </div>
          )}
        </div>
        <div className='absolute right-0 bottom-0 bg-primary rounded-tl-full rounded-br-[2400px] w-[40%]'>
          <p className='flex flex-col items-center justify-start pt-3 ml-3'>
            <span className='text-[31px] font-semibold text-[#565656]'>
              {point}
            </span>
            <span className='text-darkGrey'>/10人</span>
          </p>
        </div>
      </div>
      <div>
        <p className='text-center text-[16px] font-[700] mt-4 mb-4 h-[51px] flex items-center justify-center'>{title}</p>
        {tag[0].uuid && (
          <ul className='flex justify-center items-center gap-[10px]'>
            {tag.map(({ uuid, name }) => (
              <li key={uuid} className='bg-primary px-3 py-1 rounded-full'>
                <span className='text-[13px] whitespace-nowrap'>{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export { BookCard }
