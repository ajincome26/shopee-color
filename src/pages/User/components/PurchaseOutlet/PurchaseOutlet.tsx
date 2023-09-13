import { Link } from 'react-router-dom'
import { Purchase } from '~/types/purchase.type'
import icons from '~/utils/icons'
import { formatCurrency, generateNameId } from '~/utils/utils'

const { SiSensu } = icons
interface Props {
  data: Purchase[]
}

const PurchaseOutlet = ({ data }: Props) => {
  return (
    <>
      {data.map((item) => (
        <div key={item._id} className='flex flex-col gap-3 mt-4'>
          <div className='flex flex-col p-5 bg-white'>
            <div className='flex items-center justify-between pb-4 mb-4 border-b border-b-grayBox'>
              <div className='flex items-center gap-3 basis-1/2'>
                <Link
                  to={generateNameId(item.product.name, item.product._id)}
                  title={item.product.name}
                  className='w-20 h-20 overflow-hidden transition border rounded shrink-0 border-slate-300 hover:opacity-90'
                >
                  <img src={item.product.image} alt={item.product.name} className='object-cover w-full h-full' />
                </Link>
                <div className='flex flex-col gap-1'>
                  <Link
                    to={generateNameId(item.product.name, item.product._id)}
                    title={item.product.name}
                    className='transition cursor-pointer hover:text-primary line-clamp-2'
                  >
                    {item.product.name}
                  </Link>
                  <span className='text-sm'>x{item.buy_count}</span>
                </div>
              </div>
              <div className='basis-1/2'>
                <div className='flex items-center justify-end gap-3'>
                  <span className='line-through text-slate-400'>₫{formatCurrency(item.price_before_discount)}</span>
                  <span className='text-third'>₫{formatCurrency(item.price)}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center self-end gap-3'>
              <SiSensu color='#0891b2' size={22} />
              <span>Thành tiền:</span>
              <span className='text-2xl text-primary'>₫{formatCurrency(item.price * item.buy_count)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default PurchaseOutlet
