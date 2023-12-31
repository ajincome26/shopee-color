import icons from '~/utils/icons'
import authApi from '~/apis/auth.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~/contexts/auth.context'
import { toast } from 'react-toastify'
import { purchasesStatus } from '~/constants/purchase'
import { Popover } from '../Popover'
import { path } from '~/constants/path'
import { Link } from 'react-router-dom'
import { defaultURL, getURLAvatar } from '~/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from '~/i18n/i18n'

const { TbWorld, PiCaretDownBold, BiLogoFacebookCircle, AiFillInstagram } = icons

const NavHeader = () => {
  const { i18n, t } = useTranslation('home')
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } = useAuth()
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      setIsLoggedIn(false)
      setUserInfo(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.INCART }] })
      toast.success('Đăng xuất thành công', { autoClose: 1000 })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleChangeLaguage = (language: 'en' | 'vi') => {
    i18n.changeLanguage(language)
  }
  return (
    <div className='flex items-center justify-end text-sm leading-6 md:justify-between'>
      <div className='items-center hidden gap-2 cursor-pointer md:flex lg:gap-3'>
        <Link to='https://play.google.com/store/apps'>
          <span className='transition hover:text-gray'>{t('nav header.download')}</span>
        </Link>
        <div className='h-[18px] w-[1px] bg-grayField'></div>
        <div className='flex items-center gap-2'>
          <span className='transition hover:text-gray'>{t('nav header.follow us on')}</span>
          <Link to='https://www.facebook.com/ajincome.7'>
            <BiLogoFacebookCircle size={18} />
          </Link>
          <Link to='https://www.instagram.com/jh.tu7egend'>
            <AiFillInstagram size={18} />
          </Link>
        </div>
      </div>

      <div className='flex items-center justify-end gap-3 lg:gap-5'>
        <Popover
          className='flex flex-col w-40 bg-white rounded-sm shadow-lg text-secondary'
          hoverClass='hover:text-gray'
          popover={
            <>
              <span
                className='px-3 py-2 cursor-pointer hover:text-primary hover:bg-slate-50'
                onClick={() => handleChangeLaguage('vi')}
              >
                Tiếng Việt
              </span>
              <span
                className='px-3 py-2 cursor-pointer hover:text-primary hover:bg-slate-50'
                onClick={() => handleChangeLaguage('en')}
              >
                English
              </span>
            </>
          }
        >
          <TbWorld size={18} />
          <span>{currentLanguage}</span>
          <PiCaretDownBold />
        </Popover>

        {isLoggedIn ? (
          <Popover
            className='flex flex-col w-40 bg-white rounded-sm shadow-lg text-secondary'
            hoverClass='hover:text-gray'
            placement='bottom-end'
            popover={
              <>
                <Link
                  to={path.PROFILE}
                  className='w-full px-4 py-2 cursor-pointer hover:text-primary hover:bg-slate-50'
                >
                  {t('nav header.my account')}
                </Link>
                <Link
                  to={path.PURCHASE}
                  className='w-full px-4 py-2 cursor-pointer hover:text-primary hover:bg-slate-50'
                >
                  {t('nav header.my purchase')}
                </Link>
                <button
                  className='flex items-start w-full px-4 py-2 cursor-pointer hover:text-primary hover:bg-slate-50'
                  onClick={handleLogout}
                >
                  {t('nav header.logout')}
                </button>
              </>
            }
          >
            <div className='flex items-center gap-2 cursor-pointer'>
              <div className='w-6 h-6 overflow-hidden rounded-full'>
                <img
                  src={userInfo && userInfo.avatar !== defaultURL ? getURLAvatar(userInfo?.avatar) : defaultURL}
                  alt='avatar'
                  className='object-cover w-full h-full'
                />
              </div>
              <span className='transition hover:text-gray'>{userInfo?.name || userInfo?.email}</span>
            </div>
          </Popover>
        ) : (
          <div className='flex items-center gap-2 cursor-pointer lg:gap-3'>
            <Link to={path.REGISTER} className='transition hover:text-gray'>
              {t('nav header.register')}
            </Link>
            <div className='h-[18px] w-[1px] bg-grayField'></div>
            <Link to={path.LOGIN} className='transition hover:text-gray'>
              {t('nav header.login')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavHeader
