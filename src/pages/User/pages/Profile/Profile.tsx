import icons from '~/utils/icons'

const { PiCaretDownBold } = icons

const Profile = () => {
  return (
    <>
      <div className='flex flex-col gap-1 pb-5 mb-8 border-b border-b-grayBox'>
        <h1 className='text-xl'>Hồ sơ của tôi</h1>
        <p className='text-sm text-slate-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form className='flex gap-5'>
        <div className='basis-2/3'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-5'>
              <span className='w-1/5 font-medium text-right'>Email</span>
              <span className='w-4/5'>tuantu@gmail.com</span>
            </div>
            <div className='flex items-center gap-5'>
              <span className='w-1/5 font-medium text-right'>Tên</span>
              <input
                type='text'
                name='name'
                className='w-4/5 px-4 py-[9px] transition border border-grayBox focus:border-grayDark placeholder:text-sm'
                placeholder='Tên'
              />
            </div>
            <div className='flex items-center gap-5'>
              <span className='w-1/5 font-medium text-right'>Số Điện Thoại</span>
              <input
                type='text'
                name='name'
                className='w-4/5 px-4 py-[9px] transition border border-grayBox focus:border-grayDark placeholder:text-sm'
                placeholder='Số Điện Thoại'
              />
            </div>
            <div className='flex items-center gap-5'>
              <span className='w-1/5 font-medium text-right'>Địa chỉ</span>
              <input
                type='text'
                name='name'
                className='w-4/5 px-4 py-[9px] transition border border-grayBox focus:border-grayDark placeholder:text-sm'
                placeholder='Địa chỉ'
              />
            </div>
            <div className='flex items-center gap-5'>
              <span className='w-1/5 font-medium text-right'>Ngày sinh</span>
              <div className='grid w-4/5 grid-cols-3 gap-4'>
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

            <button className='relative px-10 py-3 text-white bg-primary w-fit left-[calc(20%+16px)] hover:opacity-80 transition mt-2'>
              Lưu
            </button>
          </div>
        </div>
        <div className='py-5 border-l basis-1/3 border-l-grayBox'>
          <div className='flex flex-col items-center gap-5'>
            <div className='w-24 h-24 overflow-hidden rounded-full shrink-0'>
              <img
                src='https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
                alt='avatar'
                className='object-cover w-full h-full'
              />
            </div>
            <label className='flex items-center justify-center h-10 transition bg-transparent border cursor-pointer w-28 text-third border-grayBox hover:bg-slate-100'>
              Chọn ảnh
              <input type='file' className='hidden' />
            </label>
            <div className='flex flex-col text-sm text-slate-400'>
              <span>Dụng lượng file tối đa 1 MB</span>
              <span>Định dạng:.JPEG, .PNG</span>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Profile
