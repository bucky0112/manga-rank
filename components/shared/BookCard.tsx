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
        <div className='rounded-3xl relative w-full h-full'>
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
                height={200}
                src='/svg/r18Cover.svg'
                alt='r18 cover'
                className='rounded-3xl'
              />
            </div>
          )}
        </div>
        <div className='absolute right-0 bottom-0 bg-primary rounded-tl-full rounded-br-[2400px] w-[35%]'>
          <p className='flex flex-col items-center justify-start pt-3 ml-3'>
            <span className='text-5xl font-semibold text-[#565656]'>
              {point}
            </span>
            <span className='text-darkGrey'>/10人</span>
          </p>
        </div>
      </div>
      <div>
        <p className='text-center text-2xl font-semibold mt-4 mb-4'>{title}</p>
        {tag[0].uuid && (
          <ul className='flex justify-center items-center gap-5'>
            {tag.map(({ uuid, name }) => (
              <li key={uuid} className='bg-primary px-4 py-1 rounded-full'>
                <span className='text-xl'>{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export { BookCard }
