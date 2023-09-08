import { Link, NavLink, Outlet } from 'react-router-dom'
import { path } from '~/constants/path'
import icons from '~/utils/icons'

const { CiEdit, FaRegUser, BsShieldLock, RiTodoLine } = icons

const dataTitles = [
  {
    id: 1,
    icon: <FaRegUser color='#0891b2' size={18} />,
    title: 'Tài khoản của tôi',
    to: path.PROFILE
  },
  {
    id: 2,
    icon: <BsShieldLock color='#0891b2' size={18} />,
    title: 'Đổi mật khẩu',
    to: path.CHANGE_PASSWORD
  },
  {
    id: 3,
    icon: <RiTodoLine color='#0891b2' size={18} />,
    title: 'Đơn mua',
    to: path.PURCHASE
  }
]

const UserLayout = () => {
  return (
    <div className='bg-gray text-secondary'>
      <div className='container'>
        <div className='flex gap-5 py-5'>
          <div className='basis-1/5'>
            <div className='flex items-center gap-3 py-5 mb-5 border-b border-b-grayBox'>
              <div className='w-[50px] h-[50px] shrink-0'>
                <img
                  src='https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
                  alt='avatar'
                  className='object-cover w-full h-full rounded-full shadow-sm'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-semibold line-clamp-1'>nvprime@gmail.com</h3>
                <Link to={path.PROFILE} className='flex items-center gap-1 cursor-pointer'>
                  <CiEdit />
                  <span className='font-medium text-slate-500 hover:text-slate-400'>Sửa hồ sơ</span>
                </Link>
              </div>
            </div>
            <div className='flex flex-col gap-5 px-4'>
              {dataTitles.map((item) => (
                <div key={item.id} className='flex items-center gap-2 cursor-pointer'>
                  <span>{item.icon}</span>
                  <NavLink to={item.to} className={({ isActive }) => (isActive ? 'text-third' : 'hover:text-primary')}>
                    {item.title}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
          <div className='p-[18px] bg-white basis-4/5 shadow-lg'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
