import { useForm, SubmitHandler } from 'react-hook-form'
import { InputText } from "components/user"

type Inputs = {
  name: string
  nickname: string
  email: string
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <h1>User Edit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          register={register}
          errors={errors}
          name='name'
          text='真實姓名'
          option={{
            required: {
              value: true,
              message: '此欄位為必填'
            },
            // pattern: {
            //   value: EmailValidator,
            //   message: 'Email填寫不正確，請再檢查拼字是否完整'
            // }
          }}
        />
        <InputText
          register={register}
          errors={errors}
          name='nickname'
          text='暱稱'
          option={{
            required: {
              value: true,
              message: '此欄位為必填'
            },
            // pattern: {
            //   value: EmailValidator,
            //   message: 'Email填寫不正確，請再檢查拼字是否完整'
            // }
          }}
        />
        <InputText
          register={register}
          errors={errors}
          name='mail'
          text='Email'
          option={{
            required: {
              value: true,
              message: '此欄位為必填'
            },
            // pattern: {
            //   value: EmailValidator,
            //   message: 'Email填寫不正確，請再檢查拼字是否完整'
            // }
          }}
        />
        <div className='flex items-center justify-end gap-10 mt-14'>
          <input
            type='submit'
            value='登入'
            className='text-3xl font-semibold bg-primary hover:bg-lightGrey rounded-full px-6 py-3 cursor-pointer'
          />
        </div>
      </form>
    </div>
  )
}

export default Page
