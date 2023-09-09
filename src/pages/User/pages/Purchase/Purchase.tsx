import { NavLink } from 'react-router-dom'
import { path } from '~/constants/path'
import { PurchaseOutlet } from './PurchaseOutlet'

const dataCatePurchase = [
  {
    id: 1,
    title: 'Tất cả'
  },
  {
    id: 2,
    title: 'Chờ xác nhận'
  },
  {
    id: 3,
    title: 'Chờ lấy hàng'
  },
  {
    id: 4,
    title: 'Đang giao'
  },
  {
    id: 5,
    title: 'Đã giao'
  },
  {
    id: 6,
    title: 'Đã hủy'
  }
]

const Purchase = () => {
  return (
    <div className='flex flex-col bg-white'>
      <div className='grid grid-cols-6'>
        {dataCatePurchase.map((item) => (
          <NavLink
            to={`${path.PURCHASE}?status=${item.id}`}
            key={item.id}
            className='flex items-center justify-center py-4 cursor-pointer px-7'
          >
            {item.title}
          </NavLink>
        ))}
      </div>
      <div>
        <PurchaseOutlet />
      </div>
    </div>
  )
}

export default Purchase
