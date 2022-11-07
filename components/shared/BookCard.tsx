import Image from 'next/image'

interface bookTag {
  uuid: string
  name: string
}

interface books {
  title: string
  cover: string
  tag: bookTag[]
}

const BookCard = ({ ...rest }: books) => {
  const { title, cover, tag } = rest

  return (
    <>
      <div className='grid grid-cols-2 w-full h-full relative cursor-pointer'>
        <Image
          className='rounded-3xl'
          layout='fill'
          objectFit='cover'
          src={cover}
          alt={title}
        />
        <p className='col-start-2 absolute z-10 justify-self-end self-end mr-2 mb-2'>
          <span className='text-6xl'>3</span>
          /10人
        </p>
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
