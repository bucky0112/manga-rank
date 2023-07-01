import { FC, useCallback } from 'react'
import Image from 'next/image'
import { IoIosClose } from 'react-icons/io'
import { useDropzone } from 'react-dropzone'

interface Props {
  atClose: () => void
  setFile: React.Dispatch<React.SetStateAction<string | null>>
}

const UploadModal: FC<Props> = ({ atClose, setFile }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const url = URL.createObjectURL(file)
      setFile(url)
      atClose()
    }
  }, [atClose])

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxSize: 2097152,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  fileRejections.forEach(({ errors }) => {
    errors.forEach((err) => {
      console.log(err.message)
    })
  })

  return (
    <div className='absolute z-20 bg-white bg-opacity-90 rounded-2xl py-28 px-56 shadow-xl'>
      <button
        type='button'
        className='absolute top-5 right-5'
        onClick={atClose}
      >
        <IoIosClose size={30} className='text-darkGrey' />
      </button>
      <div {...getRootProps()} className='flex justify-center'>
        <input {...getInputProps()} />
        <Image
          src='/svg/upload.svg'
          layout='fixed'
          height={180}
          width={180}
          alt='upload'
        />
      </div>
      <p className='flex flex-col items-center gap-y-3 text-darkGrey mt-8'>
        <span>上傳檔案 或 拖移進到視窗</span>
        <span>（不得大於2MB）</span>
      </p>
    </div>
  )
}

export { UploadModal }
