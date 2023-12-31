import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '~/components/Button'
import { Field } from '~/components/Field'
import { Input, InputPassword } from '~/components/Input'
import { Label } from '~/components/Label'
import { LoginSchema, loginSchema } from '~/utils/schema'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ResponseError } from '~/types/utils.type'
import { useAuth } from '~/contexts/auth.context'
import { path } from '~/constants/path'
import authApi from '~/apis/auth.api'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormLogin = LoginSchema

const LoginPage = () => {
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const { setIsLoggedIn, setUserInfo } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormLogin>({ resolver: yupResolver(loginSchema) })

  const loginMutation = useMutation({
    mutationFn: (body: FormLogin) => authApi.loginAccount(body)
  })

  const handleLogin = (data: FormLogin) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsLoggedIn(true)
        setUserInfo(data.data.data.user)
        navigate('/')
        toast.success('Đăng nhập thành công', { autoClose: 1000 })
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseError<FormLogin>>(error)) {
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
      <Helmet>
        <title>Đăng nhập | Shopee Color</title>
        <meta name='description' content='Đăng nhập vào dự án' />
      </Helmet>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col w-full md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] min-h-full p-8 mx-auto bg-white rounded shadow-2xl'
      >
        <h2 className='mb-2 text-xl font-semibold text-secondary'>{t('nav header.login')}</h2>
        <Field>
          <Label htmlFor='email'>{t('login.email address')}</Label>
          <Input
            className='border-transparent'
            name='email'
            register={register}
            placeholder={t('login.placeholder email')}
            errorMessage={errors.email?.message}
          />
        </Field>
        <Field>
          <Label htmlFor='password'>{t('login.password')}</Label>
          <InputPassword
            className='border-transparent'
            name='password'
            register={register}
            placeholder={t('login.placeholder password')}
            errorMessage={errors.password?.message}
          />
        </Field>

        <Button type='submit' className='px-6 py-3 my-4' isLoading={loginMutation.isLoading}>
          {t('nav header.login')}
        </Button>

        <div className='text-center'>
          {t('login.have account')}?
          <Link to={path.REGISTER} className='ml-2 font-medium transition text-primary hover:text-third'>
            {t('nav header.register')}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
