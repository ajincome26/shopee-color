import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, NavLink } from 'react-router-dom'
import purchaseApi from '~/apis/purchase.api'
import { path } from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import { useQueryParams } from '~/hooks/useQueryParams'
import { PurchaseListStatus } from '~/types/purchase.type'
import { PurchaseOutlet } from '../../components/PurchaseOutlet'
import { useTranslation } from 'react-i18next'

const Purchase = () => {
  const { t } = useTranslation('user')
  const dataCatePurchase = [
    {
      id: 1,
      title: t('purchase.all'),
      status: purchasesStatus.ALL
    },
    {
      id: 2,
      title: t('purchase.wait confilm'),
      status: purchasesStatus.WAIT
    },
    {
      id: 3,
      title: t('purchase.wait picking'),
      status: purchasesStatus.PICKING
    },
    {
      id: 4,
      title: t('purchase.shipping'),
      status: purchasesStatus.SHIPPING
    },
    {
      id: 5,
      title: t('purchase.completed'),
      status: purchasesStatus.DELIVERED
    },
    {
      id: 6,
      title: t('purchase.cancelled'),
      status: purchasesStatus.REJECTED
    }
  ]
  const queryParams: { status?: string } = useQueryParams()
  const status = Number(queryParams.status) || purchasesStatus.ALL
  const { data } = useQuery({
    queryKey: ['purchases', status],
    queryFn: () => purchaseApi.getPurchaseList({ status: status as PurchaseListStatus })
  })
  const purchases = data?.data.data
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
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
        </div>
      </div>
    </div>
  )
}

export default Purchase
