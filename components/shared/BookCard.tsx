import Image from 'next/image'

interface books {
  title: string,
  tag1: string,
  tag2: string,
  cover: string,
}

const BookCard = ({ ...rest }:books) => {
  const { title, tag1, tag2, cover } = rest
  return (
    <>
      <div className='grid grid-cols-2 w-[306px] h-[430px] relative'>
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
      <p className='text-center text-2xl font-semibold mt-4 mb-4'>{title}</p>
      <p className='flex justify-center items-center gap-4'>
        <span className='px-4 py-1 bg-primary rounded-2xl text-xl'>
          {tag1}
        </span>
        <span className='px-4 py-1 bg-primary rounded-2xl text-xl'>
          {tag2}
        </span>
      </p>
    </>
  )
}

export { BookCard }
