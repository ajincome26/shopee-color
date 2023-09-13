import { useTranslation } from 'react-i18next'

interface Props {
  title: string
}

const HeaderOutlet = ({ title }: Props) => {
  const { t } = useTranslation('user')
  return (
    <div className='flex flex-col gap-1 pb-5 mt-3 text-center border-b lg:mb-8 md:text-start border-b-grayBox md:mt-0'>
      <h1 className='text-xl'>{title}</h1>
      <p className='text-sm text-slate-600'>{t('profile.protect account')}</p>
    </div>
  )
}

export default HeaderOutlet
