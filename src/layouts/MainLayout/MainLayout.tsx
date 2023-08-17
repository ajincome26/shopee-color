import { Outlet } from 'react-router-dom'
import { Footer } from '~/components/Footer'
import { MainHeader } from '~/components/MainHeader'

const MainLayout = () => {
  return (
    <div className='pt-[120px]'>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
