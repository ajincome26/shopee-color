import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { Button } from '~/components/Button'
import { Field } from '~/components/Field'
import { Input, InputPassword } from '~/components/Input'
import { Label } from '~/components/Label'

type FormLogin = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email không hợp lệ')
      .min(5, 'Email phải có ít nhất 5 ký tự')
      .max(160, 'Email không được vượt quá 160 ký tự')
      .required('Email là bắt buộc'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(160, 'Mật khẩu không được vượt quá 160 ký tự')
      .required('Mật khẩu là bắt buộc')
  })
  .required()

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<FormLogin>({ mode: 'onChange', resolver: yupResolver(schema) })

  const handleLogin = (data: FormLogin) => {
    if (!isValid) return
    console.log('🚀 ~ file: RegisterPage.tsx:44 ~ handleLogin ~ data:', data)
  }

  return (
    <div className='flex items-center justify-center px-5 py-8 xl:min-h-[85vh] bg-primary'>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col w-full md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] min-h-full p-8 mx-auto bg-white rounded'
      >
        <h2 className='mb-2 text-xl font-semibold text-secondary'>Đăng Ký</h2>
        <Field>
          <Label htmlFor='email'>Email Address</Label>
          <Input name='email' placeholder='Enter your email' />
          <div className='text-sm text-red-500 min-h-[1rem] leading-4'></div>
        </Field>
        <Field>
          <Label htmlFor='password'>Password</Label>
          <InputPassword name='password' placeholder='Enter your password'></InputPassword>
          <div className='text-sm text-red-500 min-h-[1rem] leading-4'></div>
        </Field>

        <Button type='submit' className='my-4'>
          Đăng nhập
        </Button>

        <div className='text-center'>
          Bạn chưa có tài khoản?
          <Link to='/register' className='ml-2 font-medium transition text-primary hover:text-third'>
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
