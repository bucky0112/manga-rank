import { FC } from 'react'

interface TipsModalProps {
  text: string
}

const TipsModal: FC<TipsModalProps> = ({ text }) => (
  <div className='fixed z-10 inset-0 overflow-y-auto'>
    <div className='flex items-center justify-center min-h-screen text-center'>
      <div className='fixed inset-0 bg-black opacity-5' />
      <div className='bg-white px-14 py-12 rounded-2xl shadow-2xl'>
        <h2 className='text-lg font-semibold'>{text}</h2>
      </div>
    </div>
  </div>
)

export { TipsModal }
