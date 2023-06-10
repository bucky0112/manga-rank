import { FC } from 'react'

interface ConfirmModalProps {
  title: string
  cancelText: string
  continueText: string
  visible: boolean
  onCancel?: () => void
  onContinue?: () => void
}

const buttonStyle = 'rounded-3xl bg-lightGrey p-3 font-medium hover:bg-primary'

const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  cancelText,
  continueText,
  visible,
  onCancel,
  onContinue
}) => {
  if (!visible) return null
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen text-center'>
        <div className='fixed inset-0 bg-black opacity-5' />
        <div className='bg-white px-16 py-12 rounded-2xl shadow-2xl z-20'>
          <h2 className='text-lg font-semibold mb-10'>{title}</h2>
          <div className='flex items-center gap-x-16'>
            <button type='button' className={buttonStyle} onClick={onCancel}>
              {cancelText}
            </button>
            <button type='button' className={buttonStyle} onClick={onContinue}>
              {continueText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ConfirmModal }
