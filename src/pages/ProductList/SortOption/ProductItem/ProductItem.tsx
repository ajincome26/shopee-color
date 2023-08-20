import { handleStar } from '~/utils/utils'

const ProductItem = () => {
  return (
    <div className='transition duration-200 ease-linear bg-white cursor-pointer hover:scale-101'>
      <div className='relative w-full h-48'>
        <img src='https://source.unsplash.com/random' alt='product-item' className='object-cover w-full h-full' />
        <div className='absolute right-0 top-0 w-0 h-0 border-fourth border-x-[25px] border-t-[40px] border-b-[15px] z-10 border-b-transparent'></div>
        <div className='absolute top-[6px] right-0 z-10 flex flex-col text-xs w-[50px] justify-center items-center'>
          <span className='text-secondary'>21%</span>
          <span className='tracking-wider text-white'>GIẢM</span>
        </div>
      </div>
      <div className='p-2'>
        <h3 className='truncate-2'>
          Ốp lưng iPhone trong suốt chống sốc - Hỗ trợ sạc từ tính cho iphone 11 pro max 12 pro max 13 pro max 14 pro
          max
        </h3>
        <div className='flex items-center gap-4 mt-2 text-sm'>
          <span className='line-through text-grayDark opacity-70'>₫30.990.000</span>
          <span className='text-base text-primary'>₫24.390.000</span>
        </div>
        <div className='flex items-center gap-4 mt-1'>
          <div className='flex items-center gap-[2px]'>{handleStar(4, 14)}</div>
          <span className='text-sm'>Đã bán 3,4k</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
