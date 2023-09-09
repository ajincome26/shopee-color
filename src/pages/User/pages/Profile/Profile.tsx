import { Input } from '~/components/Input'
import icons from '~/utils/icons'
import { HeaderOutlet } from '../../components/HeaderOutlet'
import { useForm } from 'react-hook-form'

const { PiCaretDownBold } = icons

const Profile = () => {
  const { register } = useForm()
  return (
    <div className='md:p-[18px]'>
      <HeaderOutlet title='Hồ sơ của tôi' />
      <form className='flex flex-col-reverse lg:gap-10 lg:flex-row'>
        <div className='basis-2/3'>
          <div className='flex flex-col gap-3 px-2 lg:px-0'>
            <div className='flex flex-col gap-5 lg:items-center lg:flex-row mb-[15px]'>
              <span className='font-semibold lg:font-medium lg:text-right lg:w-1/5'>Email</span>
              <span className='lg:w-4/5'>tuantu@gmail.com</span>
            </div>
            <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
              <span className='relative lg:font-medium font-semibold lg:text-right lg:w-1/5 lg:top-[9px]'>Tên</span>
              <div className='lg:w-4/5'>
                <Input
                  name='name'
                  register={register}
                  placeholder='Tên'
                  className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
              <span className='relative lg:font-medium font-semibold lg:text-right lg:w-1/5 lg:top-[9px]'>
                Số điện thoại
              </span>
              <div className='lg:w-4/5'>
                <Input
                  name='phone'
                  register={register}
                  placeholder='Số điện thoại'
                  className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 lg:gap-5 lg:flex-row'>
              <span className='relative lg:font-medium font-semibold lg:text-right lg:w-1/5 lg:top-[9px]'>Địa chỉ</span>
              <div className='lg:w-4/5'>
                <Input
                  name='address'
                  register={register}
                  placeholder='Địa chỉ'
                  className='px-4 py-[9px] transition border-grayBox focus:border-grayDark placeholder:text-sm mb-0 rounded-none bg-white'
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 lg:gap-5 lg:items-center lg:flex-row'>
              <span className='font-semibold lg:font-medium lg:text-right lg:w-1/5'>Ngày sinh</span>
              <div className='grid grid-cols-3 gap-4 lg:w-4/5'>
                <div className='relative group'>
                  <select
                    className='flex items-center justify-between w-full h-10 px-4 py-2 border outline-none cursor-pointer border-grayBox group-hover:border-primary'
                    value='1'
                    onChange={() => {}}
                  >
                    <option value='1' className='bg-white text-secondary'>
                      1
                    </option>
                  </select>
                  <div className='absolute top-1/2 right-[14px] translate-y-[-50%] cursor-pointer group-hover:border-primary'>
                    <PiCaretDownBold color='#0891b2' />
                  </div>
                </div>
                <div className='relative group'>
                  <select
                    className='flex items-center justify-between w-full h-10 px-4 py-2 border outline-none cursor-pointer border-grayBox group-hover:border-primary'
                    value='1'
                    onChange={() => {}}
                  >
                    <option value='1' className='bg-white text-secondary'>
                      1
                    </option>
                  </select>
                  <div className='absolute top-1/2 right-[14px] translate-y-[-50%] cursor-pointer group-hover:border-primary'>
                    <PiCaretDownBold color='#0891b2' />
                  </div>
                </div>
                <div className='relative group'>
                  <select
                    className='flex items-center justify-between w-full h-10 px-4 py-2 border outline-none cursor-pointer border-grayBox group-hover:border-primary'
                    value='1990'
                    onChange={() => {}}
                  >
                    <option value='1' className='bg-white text-secondary'>
                      1990
                    </option>
                  </select>
                  <div className='absolute top-1/2 right-[14px] translate-y-[-50%] cursor-pointer group-hover:border-primary'>
                    <PiCaretDownBold color='#0891b2' />
                  </div>
                </div>
              </div>
            </div>

            <button className='relative px-10 py-3 text-white bg-primary w-fit lg:left-[calc(20%+16px)] hover:opacity-80 transition mt-2 mb-8 md:mb-5'>
              Lưu
            </button>
          </div>
        </div>
        <div className='basis-1/3'>
          <div className='flex flex-col items-center gap-5 py-10 lg:border-l lg:border-l-grayBox'>
            <div className='w-24 h-24 overflow-hidden rounded-full shrink-0'>
              <img
                src='https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
                alt='avatar'
                className='object-cover w-full h-full'
              />
            </div>
            <label className='flex items-center justify-center h-10 transition bg-transparent border cursor-pointer w-28 text-third border-grayBox hover:bg-slate-100'>
              Chọn ảnh
              <input type='file' className='hidden' accept='.jpg,.jpeg,.png' />
            </label>
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
