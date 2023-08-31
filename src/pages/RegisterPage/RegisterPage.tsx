import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { registerSchema, RegisterSchema } from '~/utils/schema'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '~/components/Label'
import { Input, InputPassword } from '~/components/Input'
import { Field } from '~/components/Field'
import { Button } from '~/components/Button'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ResponseError } from '~/types/utils.type'
import { toast } from 'react-toastify'
import { useAuth } from '~/contexts/auth.context'
import { path } from '~/constants/path'
import authApi from '~/apis/auth.api'

export type FormRegister = RegisterSchema

const RegisterPage = () => {
  const { setIsLoggedIn, setUserInfo } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormRegister>({
    resolver: yupResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormRegister, 'cpassword'>) => {
      return authApi.registerAccount(body)
    }
  })

  const handleSignUp = (data: FormRegister) => {
    const payload = omit(data, ['cpassword'])
    registerMutation.mutate(payload, {
      onSuccess: (data) => {
        setIsLoggedIn(true)
        setUserInfo(data.data.data.user)
        navigate('/')
        toast.success('Đăng ký tài khoản thành công', { autoClose: 1000 })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseError<Omit<FormRegister, 'cpassword'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) =>
              setError(key as keyof Omit<FormRegister, 'cpassword'>, {
                message: formError[key as keyof Omit<FormRegister, 'cpassword'>],
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

        <Button type='submit' className='px-6 py-3 my-4' isLoading={registerMutation.isLoading}>
          Đăng ký
        </Button>

        <div className='text-center'>
          Bạn đã có tài khoản?
          <Link to={path.LOGIN} className='ml-2 font-medium transition text-primary hover:text-third'>
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
