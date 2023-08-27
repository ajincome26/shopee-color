import { path } from '~/constants/path'
import { Button } from '../Button'

const CartBox = () => {
  return (
    <div className='text-sm text-secondary'>
      <h3 className='p-3 text-base'>Sản phẩm mới thêm</h3>
      <div className='pb-3'>
        <div className='flex items-start gap-3 p-3 hover:bg-slate-50'>
          <div className='shadow-md w-9 h-9 shrink-0'>
            <img src='https://source.unsplash.com/random' alt='' className='object-cover w-full h-full' />
          </div>
          <p className='line-clamp-1'>Set 20 bút gel HAPPI viết gel bút abcdascmsacksac lámlcmsac</p>
          <div className='text-primary'>14.500</div>
        </div>
      </div>
      <div className='flex items-center justify-between p-3'>
        <div className='text-slate-400'>180 Thêm Hàng Vào Giỏ</div>
        <Button to={path.CART} className='right-0 flex px-4 py-2 md:w-auto md:mx-0'>
          Xem Giỏ Hàng
        </Button>
      </div>
    </div>
  )
}

export default CartBox
