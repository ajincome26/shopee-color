import { InputPassword } from '~/components/Input'
import { HeaderOutlet } from '../../components/HeaderOutlet'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/Button'

const ChangePassword = () => {
  const { register } = useForm()
  return (
    <div className='md:p-[18px]'>
      <HeaderOutlet title='Đổi mật khẩu' />
      <form className='flex flex-col gap-3 px-2 mt-4 lg:w-2/3'>
        <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
          <span className='relative lg:font-medium font-semibold lg:text-right lg:w-2/5 lg:top-[9px]'>Mật khẩu cũ</span>
          <div className='lg:w-3/5'>
            <InputPassword
              name='name'
              register={register}
              placeholder='Mật khẩu cũ'
              className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
          <span className='relative lg:font-medium font-semibold lg:text-right lg:w-2/5 lg:top-[9px]'>
            Mật khẩu mới
          </span>
          <div className='lg:w-3/5'>
            <InputPassword
              name='name'
              register={register}
              placeholder='Mật khẩu mới'
              className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
          <span className='relative lg:font-medium font-semibold lg:text-right lg:w-2/5 lg:top-[9px]'>
            Nhập lại mật khẩu mới
          </span>
          <div className='lg:w-3/5'>
            <InputPassword
              name='name'
              register={register}
              placeholder='Nhập lại mật khẩu mới'
              className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
            />
          </div>
        </div>

        <Button className='relative px-10 py-3 text-white bg-primary w-fit lg:left-[calc(40%+12px)] hover:opacity-80 transition mt-2 md:mt-0 mb-8 md:mb-5 rounded-none bg-none hover:bg-none hover:bg-opacity-80'>
          Lưu
        </Button>
      </form>
    </div>
  )
}

export default ChangePassword
