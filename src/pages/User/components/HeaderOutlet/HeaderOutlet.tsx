interface Props {
  title: string
}

const HeaderOutlet = ({ title }: Props) => {
  return (
    <div className='flex flex-col gap-1 pb-5 mt-3 text-center border-b lg:mb-8 md:text-start border-b-grayBox md:mt-0'>
      <h1 className='text-xl'>{title}</h1>
      <p className='text-sm text-slate-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    </div>
  )
}

export default HeaderOutlet
