import { Link } from 'react-router-dom'
import { handleStar } from '~/utils/utils'

const ProductItem = () => {
  return (
    <Link
      to='/item'
      className='transition duration-200 ease-linear bg-white cursor-pointer hover:shadow-xl hover:-translate-y-[2px]'
    >
      <div className='relative w-full h-48'>
        <img src='https://source.unsplash.com/random' alt='product-item' className='object-cover w-full h-full' />
        <div className='absolute right-0 top-0 w-0 h-0 border-fourth border-x-[25px] border-t-[40px] border-b-[15px] border-b-transparent'></div>
        <div className='absolute top-[6px] right-0 flex flex-col text-xs w-[50px] justify-center items-center'>
          <span className='font-semibold text-secondary'>21%</span>
          <span className='tracking-wider text-white'>GIẢM</span>
        </div>
      </div>
      <div className='p-2'>
        <h3 className='truncate-2'>
          Ốp lưng iPhone trong suốt chống sốc - Hỗ trợ sạc từ tính cho iphone 11 pro max 12 pro max 13 pro max 14 pro
          max
        </h3>
        <div className='flex items-center gap-4 mt-[10px] xl:gap-2 2xl:gap-1'>
          <span className='text-sm line-through text-grayDark opacity-70 md:text-xs xl:text-sm'>₫30.990.000</span>
          <span className='text-sm md:text-xs text-primary xl:text-sm 2xl:text-base'>₫24.390.000</span>
        </div>
        <div className='flex items-center gap-4 mt-2 md:gap-2'>
          <div className='flex items-center gap-[2px]'>{handleStar(4, 12)}</div>
          <span className='text-sm md:text-xs xl:text-sm'>Đã bán 3,4k</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
