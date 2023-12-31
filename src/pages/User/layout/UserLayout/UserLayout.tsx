import { Link, NavLink, Outlet } from 'react-router-dom'
import { path } from '~/constants/path'
import { useAuth } from '~/contexts/auth.context'
import icons from '~/utils/icons'
import { defaultURL, getURLAvatar } from '~/utils/utils'
import { useTranslation } from 'react-i18next'

const { CiEdit, FaRegUser, BsShieldLock, RiTodoLine } = icons

const UserLayout = () => {
  const { t } = useTranslation('user')
  const { userInfo } = useAuth()
  const dataTitles = [
    {
      id: 1,
      icon: <FaRegUser color='#0891b2' size={18} />,
      title: t('user.my account'),
      to: path.PROFILE
    },
    {
      id: 2,
      icon: <BsShieldLock color='#0891b2' size={18} />,
      title: t('user.change password'),
      to: path.CHANGE_PASSWORD
    },
    {
      id: 3,
      icon: <RiTodoLine color='#0891b2' size={18} />,
      title: t('user.my purchase'),
      to: path.PURCHASE
    }
  ]
  return (
    <div className='bg-gray text-secondary'>
      <div className='container'>
        <div className='flex flex-col gap-5 md:py-5 md:flex-row'>
          <div className='md:basis-3/12 lg:basis-1/5 shrink-0'>
            <div className='flex items-center gap-3 py-5 mb-5 border-b border-b-grayBox'>
              <Link to={path.PROFILE} className='w-[50px] h-[50px] shrink-0'>
                <img
                  src={userInfo && userInfo.avatar !== defaultURL ? getURLAvatar(userInfo?.avatar) : defaultURL}
                  alt='avatar'
                  className='object-cover w-full h-full rounded-full shadow-sm'
                />
              </Link>
              <div className='flex flex-col gap-2'>
                <h3 className='font-semibold line-clamp-1'>{userInfo?.name || userInfo?.email}</h3>
                <Link to={path.PROFILE} className='flex items-center gap-1 cursor-pointer'>
                  <CiEdit />
                  <span className='font-medium text-slate-500 hover:text-slate-400'>{t('user.edit profile')}</span>
                </Link>
              </div>
            </div>
            <div className='flex flex-col gap-5 lg:px-4'>
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

          <div className='mb-8 overflow-auto bg-white md:basis-9/12 lg:basis-4/5 h-fit md:mb-0'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
