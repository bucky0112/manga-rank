import { FC } from 'react'
import styles from 'styles/user/SignUp.module.scss'

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
  style?: string
  errorMessageStyle?: string
  errorTextStyle?: string
}

const InputText: FC<Props> = ({
  register,
  errors = {},
  name,
  text,
  option = {},
  errorText,
  type = 'text',
  style = styles.inputText,
  errorMessageStyle = "text-red-500 ml-2 mt-4 text-xl",
  errorTextStyle = "text-xl ml-2 mt-4 text-mediumGrey"
}) => (
  <div className={style}>
    <label className={`${errors?.[name] ? styles.error : ''}`}>
      {text}
      <input type={type} {...register(name, { ...option })} />
    </label>
    {errors?.[name] ? (
      <p className={errorMessageStyle}>{errors?.[name].message}</p>
    ) : <p className={errorTextStyle}>{errorText}</p>}
  </div>
)

export { InputText }
