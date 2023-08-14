import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Button } from '~/components/Button'
import { Field } from '~/components/Field'
import { Input, InputPassword } from '~/components/Input'
import { Label } from '~/components/Label'
import { registerSchema, RegisterSchema } from '~/utils/schema'

type FormRegister = RegisterSchema

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormRegister>({
    resolver: yupResolver(registerSchema)
  })

  const handleSignUp = (data: FormRegister) => {
    const payload = {
      email: data.email,
      password: data.password
    }
    console.log('🚀 ~ file: RegisterPage.tsx:47 ~ handleSignUp ~ payload:', payload)
  }

  return (
    <div className='flex items-center justify-center px-5 py-8 xl:min-h-[85vh] bg-primary'>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className='flex flex-col w-full md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] min-h-full p-8 mx-auto bg-white rounded shadow-2xl'
      >
        <h2 className='mb-2 text-xl font-semibold text-secondary'>Đăng Ký</h2>
        <Field>
          <Label htmlFor='email'>Email Address</Label>
          <Input name='email' register={register} placeholder='Enter your email' errorMessage={errors.email?.message} />
        </Field>
        <Field>
          <Label htmlFor='password'>Password</Label>
          <InputPassword
            name='password'
            register={register}
            placeholder='Enter your password'
            errorMessage={errors.password?.message}
          />
        </Field>
        <Field>
          <Label htmlFor='cpassword'>Confirm Password</Label>
          <InputPassword
            name='cpassword'
            register={register}
            placeholder='Confirm password'
            errorMessage={errors.cpassword?.message}
          />
        </Field>

        <Button type='submit' className='my-4'>
          Đăng ký
        </Button>

        <div className='text-center'>
          Bạn đã có tài khoản?
          <Link to='/login' className='ml-2 font-medium transition text-primary hover:text-third'>
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
