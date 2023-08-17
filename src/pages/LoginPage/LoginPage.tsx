import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '~/components/Button'
import { Field } from '~/components/Field'
import { Input, InputPassword } from '~/components/Input'
import { Label } from '~/components/Label'
import { LoginSchema, loginSchema } from '~/utils/schema'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { Response } from '~/types/utils.type'

type FormLogin = LoginSchema

const LoginPage = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormLogin>({ resolver: yupResolver(loginSchema) })

  const loginMutation = useMutation({
    mutationFn: (body: FormLogin) => loginAccount(body)
  })

  const handleLogin = (data: FormLogin) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/')
        toast.success('Đăng nhập thành công')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<Response<FormLogin>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) =>
              setError(key as keyof FormLogin, {
                message: formError[key as keyof FormLogin],
                type: 'Server'
              })
            )
          }
        }
      }
    })
  }

  return (
    <div className='flex items-center justify-center px-5 py-8 xl:min-h-[85vh] bg-primary'>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col w-full md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] min-h-full p-8 mx-auto bg-white rounded shadow-2xl'
      >
        <h2 className='mb-2 text-xl font-semibold text-secondary'>Đăng nhập</h2>
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
