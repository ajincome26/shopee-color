import { Outlet } from 'react-router-dom'
import { Footer } from '~/components/Footer'
import { RegisterHeader } from '~/components/RegisterHeader'

const RegisterLayout = () => {
  return (
    <>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </>
  )
}

export default RegisterLayout
