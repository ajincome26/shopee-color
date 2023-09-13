import userApi from '~/apis/user.api'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema, UserSchema } from '~/utils/schema'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ResponseError } from '~/types/utils.type'
import omit from 'lodash/omit'
import { ObjectSchema } from 'yup'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { InputPassword } from '~/components/Input'
import { HeaderOutlet } from '../../components/HeaderOutlet'
import { Button } from '~/components/Button'
import { useTranslation } from 'react-i18next'

type FormPassword = Pick<UserSchema, 'password' | 'new_password' | 'cpassword'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'cpassword'])

const ChangePassword = () => {
  const { t } = useTranslation('user')
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormPassword>({
    resolver: yupResolver(passwordSchema as ObjectSchema<FormPassword>),
    defaultValues: {
      password: '',
      new_password: '',
      cpassword: ''
    }
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)

  const handleSubmitForm = async (data: FormPassword) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, 'cpassword'))
      toast.success(res.data.message, { autoClose: 1000, position: 'top-center' })
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ResponseError<FormPassword>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) =>
            setError(key as keyof FormPassword, {
              message: formError[key as keyof FormPassword],
              type: 'Server'
            })
          )
        }
      }
    }
  }
  return (
    <div className='md:p-[18px] shadow-lg'>
      <HeaderOutlet title={t('password.change password')} />
      <form onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-3 px-2 mt-4 lg:w-2/3'>
        <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
          <span className='relative lg:font-medium font-semibold lg:text-right lg:w-2/5 lg:top-[9px]'>
            {t('password.old password')}
          </span>
          <div className='lg:w-3/5'>
            <InputPassword
              name='password'
              register={register}
              placeholder={t('password.old password')}
              errorMessage={errors.password?.message}
              className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
          <span className='relative lg:font-medium font-semibold lg:text-right lg:w-2/5 lg:top-[9px]'>
            {t('password.new password')}
          </span>
          <div className='lg:w-3/5'>
            <InputPassword
              name='new_password'
              register={register}
              placeholder={t('password.new password')}
              errorMessage={errors.new_password?.message}
              className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
          <span className='relative lg:font-medium font-semibold lg:text-right lg:w-2/5 lg:top-[9px]'>
            {t('password.confilm password')}
          </span>
          <div className='lg:w-3/5'>
            <InputPassword
              name='cpassword'
              register={register}
              placeholder={t('password.confilm password')}
              errorMessage={errors.cpassword?.message}
              className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
            />
          </div>
        </div>

        <Button
          className='relative px-10 py-3 text-white bg-primary w-fit lg:left-[calc(40%+12px)] hover:opacity-80 transition mt-2 md:mt-0 mb-8 md:mb-5 rounded-none bg-none hover:bg-none hover:bg-opacity-80'
          type='submit'
        >
          {t('profile.save')}
        </Button>
      </form>
    </div>
  )
}

export default ChangePassword
