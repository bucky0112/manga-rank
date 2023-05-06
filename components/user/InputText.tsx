import { FC } from 'react'
import styles from '../../styles/user/SignUp.module.scss'
import { UseFormRegister, FieldValues } from 'react-hook-form'

interface Props {
  register: any
  errors?: any
  name: string
  text: string
  option?: {
    required: { value: boolean; message: string }
    maxLength?: { value: number; message: string }
    pattern?: { value: RegExp; message: string }
    minLength?: { value: number; message: string }
  }
  errorText?: string
  type?: string
}

const InputText: FC<Props> = ({
  register,
  errors = {},
  name,
  text,
  option = {},
  errorText,
  type = 'text'
}) => (
  <div className={styles.inputText}>
    <label className={`${errors?.[name] ? styles.error : ''}`}>
      {text}
      <input type={type} {...register(name, { ...option })} />
    </label>
    {errors?.[name] ? (
      <p className='text-red-500 ml-2 mt-4 text-xl'>{errors?.[name].message}</p>
    ) : <p className='text-xl ml-2 mt-4 text-mediumGrey'>{errorText}</p>}
  </div>
)

export { InputText }
