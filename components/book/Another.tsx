import Image from 'next/image'

const FakBook = () => (
  <>
    <Image
      src='https://fakeimg.pl/302x431/'
      layout='intrinsic'
      width='302'
      height='431'
      alt='book1'
      className='rounded-3xl object-cover'
    />
    <p className='text-center text-2xl font-semibold mt-9'>
      間諜家家酒 Spy x Family
    </p>
  </>
)

const Another = () => (
  <div>
    <p className='text-2xl font-semibold mb-12'>也許你也會喜歡...</p>
    <ul className='flex items-center gap-x-20'>
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <FakBook />
        </li>
      ))}
    </ul>
  </div>
)

export { Another }
