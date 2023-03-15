import { FC } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { IoCloseOutline } from 'react-icons/io5'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '30px',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  }
}

type AgeTipsProps = {
  isOpen: boolean
  atClose: () => void
}

const AgeTips: FC<AgeTipsProps> = ({ isOpen, atClose }) => {
  Modal.setAppElement('#__next')
  const router = useRouter()

  return (
    <Modal isOpen onRequestClose={atClose} style={customStyles}>
      <button type='button' onClick={atClose}>
        <IoCloseOutline className='absolute top-4 right-4' />
      </button>
      <div className='grid grid-cols-2 grid-rows-3 px-10 pb-4 w-[973px] h-[468px] bg-white text-2xl font-semibold text-gray-700'>
        <p className='col-span-2 row-span-2 justify-center flex flex-col gap-y-12 px-10'>
          <span className='text-center'>
            此為18禁內容，可能含有過當描述情色、賭博、吸毒、販毒、搶劫、竊盜、綁架、殺人或其他犯罪行為者。
          </span>
          <span className='text-center'>閱讀者須年滿18歲才能觀看。</span>
        </p>
        <div className='col-span-2 grid grid-cols-2 border-t border-darkGrey'>
          <button
            className='border-r border-darkGrey'
            onClick={() => router.push('/')}
          >
            <p className=''>我還沒18歲嗚嗚 幾年後再來</p>
          </button>
          <button className='' onClick={atClose}>
            <p className=''>我已滿18歲而且沒有說謊</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export { AgeTips }
