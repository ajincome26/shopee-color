import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, NavLink } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import { path } from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import { useQueryParams } from '~/hooks/useQueryParams'
import { PurchaseListStatus } from '~/types/purchase.type'
import { PurchaseOutlet } from '../../components/PurchaseOutlet'

const dataCatePurchase = [
  {
    id: 1,
    title: 'Tất cả',
    status: purchasesStatus.ALL
  },
  {
    id: 2,
    title: 'Chờ xác nhận',
    status: purchasesStatus.WAIT
  },
  {
    id: 3,
    title: 'Chờ lấy hàng',
    status: purchasesStatus.PICKING
  },
  {
    id: 4,
    title: 'Đang giao',
    status: purchasesStatus.SHIPPING
  },
  {
    id: 5,
    title: 'Đã giao',
    status: purchasesStatus.DELIVERED
  },
  {
    id: 6,
    title: 'Đã hủy',
    status: purchasesStatus.REJECTED
  }
]

const Purchase = () => {
  const queryParams: { status?: string } = useQueryParams()
  const status = Number(queryParams.status)
  const { data } = useQuery({
    queryKey: ['purchases', status],
    queryFn: () => purchaseApi.getPurchaseList({ status: status as PurchaseListStatus })
  })
  const purchases = data?.data.data
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-6 shadow-lg'>
        {dataCatePurchase.map((item) => (
          <NavLink
            to={{
              pathname: path.PURCHASE,
              search: createSearchParams({
                status: String(item.status)
              }).toString()
            }}
            key={item.id}
            className={classNames('flex items-center justify-center py-4 cursor-pointer px-7 border-b-[2px]', {
              'border-b-primary text-third': status === item.status,
              'border-b-transparent': status !== item.status
            })}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
      <div className='w-full h-full bg-gray'>
        <PurchaseOutlet data={purchases || []} />
      </div>
    </div>
  )
}

export default Purchase
