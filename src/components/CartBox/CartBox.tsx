import { useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import { Purchase } from '~/types/purchase.type'
import { formatCurrency, generateNameId } from '~/utils/utils'
import { Button } from '../Button'

const MAX_PURCHASES = 5

interface Props {
  data: Purchase[]
}

const CartBox = ({ data }: Props) => {
  const navigate = useNavigate()
  if (data.length === 0)
    return (
      <div className='flex flex-col'>
        <div className='rounded-full w-36 h-36'>
          <img
            src='https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg?w=740'
            alt='cart-empty'
            className='object-cover w-full h-full'
          />
        </div>
        <span className='text-slate-400'>Chưa có sản phẩm</span>
      </div>
    )
  return (
    <div className='text-sm text-secondary'>
      <h3 className='p-3 text-base'>Sản phẩm mới thêm</h3>
      {data.slice(0, MAX_PURCHASES).map((item) => (
        <div
          key={item._id}
          title={item.product.name}
          className='flex items-start gap-3 p-3 cursor-pointer hover:bg-slate-50'
          onClick={() => navigate(generateNameId(item.product.name, item.product._id))}
        >
          <div className='shadow-md w-9 h-9 shrink-0'>
            <img src={item.product.image} alt={item._id} className='object-cover w-full h-full' />
          </div>
          <p className='line-clamp-1'>{item.product.name}</p>
          <div className='text-primary'>₫{formatCurrency(item.product.price)}</div>
        </div>
      ))}
      <div className='flex items-center justify-between p-3'>
        <div className='text-slate-400'>
          {data.length > MAX_PURCHASES ? data.length - MAX_PURCHASES : ''} Thêm Hàng Vào Giỏ
        </div>
        <Button to={path.CART} className='right-0 flex px-4 py-2 md:w-auto md:mx-0'>
          Xem Giỏ Hàng
        </Button>
      </div>
    </div>
  )
}

export default CartBox
