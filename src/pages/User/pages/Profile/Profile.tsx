import userApi from '~/apis/user.api'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema, UserSchema } from '~/utils/schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '~/contexts/auth.context'
import { toast } from 'react-toastify'
import { setUserInfoToStorage } from '~/utils/auth'
import { ObjectSchema } from 'yup'
import { Input, InputNumber } from '~/components/Input'
import { HeaderOutlet } from '../../components/HeaderOutlet'
import { defaultURL, getURLAvatar, isAxiosUnprocessableEntityError } from '~/utils/utils'
import { DateUser } from '../../components/DateUser'
import { Button } from '~/components/Button'
import { ResponseError } from '~/types/utils.type'

type FormProfile = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>
type FormProfileError = Omit<FormProfile, 'date_of_birth'> & {
  date_of_birth: string
}
const profileSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])

const Profile = () => {
  const { setUserInfo } = useAuth()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  const profile = profileData?.data.data
  const {
    handleSubmit,
    register,
    control,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormProfile>({
    resolver: yupResolver(profileSchema as ObjectSchema<FormProfile>),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    }
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
      setValue('avatar', profile.avatar)
    }
  }, [profile, setValue])

  const handleSubmitProfile = async (data: FormProfile) => {
    try {
      let avatarName = ''
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const res = await uploadAvatarMutation.mutateAsync(form)
        avatarName = res.data.data
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setValue('avatar', avatarName)
      setUserInfo(res.data.data)
      setUserInfoToStorage(res.data.data)
      toast.success(res.data.message, { autoClose: 1000, position: 'top-center' })
      refetch()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ResponseError<FormProfileError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) =>
            setError(key as keyof FormProfileError, {
              message: formError[key as keyof FormProfileError],
              type: 'Server'
            })
          )
        }
      }
    }
  }

  const handleUpload = () => {
    inputFileRef.current?.click()
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return null
    setFile(file)
  }

  if (!profile) return null
  return (
    <div className='md:p-[18px]'>
      <HeaderOutlet title='Hồ sơ của tôi' />
      <form onSubmit={handleSubmit(handleSubmitProfile)} className='flex flex-col-reverse lg:gap-10 lg:flex-row'>
        <div className='basis-2/3'>
          <div className='flex flex-col gap-3 px-2 lg:px-0'>
            <div className='flex flex-col gap-5 lg:items-center lg:flex-row mb-[15px]'>
              <span className='font-semibold lg:font-medium lg:text-right lg:w-1/5'>Email</span>
              <span className='lg:w-4/5'>{profile.email}</span>
            </div>
            <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
              <span className='relative lg:font-medium font-semibold lg:text-right lg:w-1/5 lg:top-[9px]'>Tên</span>
              <div className='lg:w-4/5'>
                <Input
                  name='name'
                  register={register}
                  placeholder='Tên'
                  errorMessage={errors.name?.message}
                  className='px-4 py-[9px] transition border-grayBox placeholder:text-sm rounded-none bg-white'
                />
              </div>
            </div>
            <div>
              <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
                <span className='relative lg:font-medium font-semibold lg:text-right lg:w-1/5 lg:top-[9px]'>
                  Số điện thoại
                </span>
                <div className='lg:w-4/5'>
                  <Controller
                    control={control}
                    name='phone'
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <InputNumber
                          className='px-4 py-[9px] transition border-grayBox hover:border-primary focus:border-primary placeholder:text-sm mb-0 rounded-none bg-white w-full'
                          placeholder='Số điện thoại'
                          onChange={onChange}
                          value={value}
                          ref={ref}
                        />
                      )
                    }}
                  />
                </div>
              </div>
              <div className='text-sm text-red-500 min-h-[1rem] leading-4 mt-[6px] relative lg:left-[calc(20%+16px)]'>
                {errors.phone?.message}
              </div>
            </div>
            <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
              <span className='relative lg:font-medium font-semibold lg:text-right lg:w-1/5 lg:top-[9px]'>Địa chỉ</span>
              <div className='lg:w-4/5'>
                <Input
                  name='address'
                  register={register}
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                  className='px-4 py-[9px] transition border-grayBox placeholder:text-sm rounded-none bg-white'
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field: { onChange, value } }) => {
                return (
                  <DateUser
                    errorMessage={errors.date_of_birth?.message}
                    onChange={(value) => onChange(value)}
                    value={value}
                  />
                )
              }}
            />

            <Button
              type='submit'
              className='relative px-10 py-3 text-white bg-primary w-fit lg:left-[calc(20%+16px)] transition mt-2 mb-8 md:mb-4 rounded-none bg-none hover:bg-none hover:bg-opacity-80'
            >
              Lưu
            </Button>
          </div>
        </div>
        <div className='basis-1/3'>
          <div className='flex flex-col items-center gap-5 py-10 lg:border-l lg:border-l-grayBox'>
            <div className='w-24 h-24 overflow-hidden rounded-full shrink-0'>
              <img
                src={
                  previewImage ||
                  (profile.avatar === '' || profile.avatar === defaultURL ? defaultURL : getURLAvatar(profile.avatar))
                }
                alt='avatar'
                className='object-cover w-full h-full'
              />
            </div>
            <button
              type='button'
              className='flex items-center justify-center h-10 transition bg-transparent border cursor-pointer w-28 text-third border-grayBox hover:bg-slate-100'
              onClick={handleUpload}
            >
              Chọn ảnh
              <input
                type='file'
                className='hidden'
                accept='.jpg,.jpeg,.png'
                ref={inputFileRef}
                onChange={onFileChange}
              />
            </button>
            <div className='flex flex-col text-sm text-slate-400'>
              <span>Dụng lượng file tối đa 1 MB</span>
              <span>Định dạng:.JPEG, .PNG</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
