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
        className='grid grid-cols-2 w-full h-full relative cursor-pointer'
        onClick={() => router.push(`/book/${uuid}`)}
      >
        <Image
          className='rounded-3xl'
          layout='fill'
          sizes='responsive'
          src={isAdult ? "/svg/no_adult.svg" : cover}
          alt={title}
        />
        <div className='col-start-2 absolute justify-self-end self-end bg-primary rounded-tl-full rounded-br-[2400px] w-[70%]'>
          <p className='flex flex-col items-center justify-start pt-3 ml-3'>
            <span className='text-5xl font-semibold text-[#565656]'>{point}</span>
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
