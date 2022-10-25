import { FC } from 'react'
import styles from '../../styles/user/SignUp.module.scss'
import { UseFormRegister, FieldValues } from 'react-hook-form'

// Todo: errors 要修改
interface Props {
  register: any
  errors?: any
  name: string
  text: string
  option?: { required: boolean }
  errorText?: string
}

const InputText: FC<Props> = ({
  register,
  errors = {},
  name,
  text,
  option = {},
  errorText
}) => (
  <div className={styles.inputText}>
    <label className={`${errors?.[name] ? styles.error : ''}`}>
      {text}
      <input type='text' {...register(name, { ...option })} />
    </label>
    {errors?.[name] && <p className="text-red-500 ml-2 mt-4 text-xl">{errorText}</p>}
  </div>
)

export { InputText }
