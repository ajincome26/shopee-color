import { Outlet } from 'react-router-dom'
import { CartHeader } from '~/components/CartHeader'
import { Footer } from '~/components/Footer'

const CartLayout = () => {
  return (
    <>
      <CartHeader />
      <Outlet />
      <Footer />
    </>
  )
}

export default CartLayout
