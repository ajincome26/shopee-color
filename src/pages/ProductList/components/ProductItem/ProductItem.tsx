import { Product } from '~/types/product.type'
import { Link } from 'react-router-dom'
import { formatCurrency, formatNumberToSocialStyle, handleDiscount, handleRating } from '~/utils/utils'

interface ProductProps {
  product: Product
}

const ProductItem = ({ product }: ProductProps) => {
  const { _id, image, name, price_before_discount, price, sold, rating } = product
  return (
    <Link
      to={`/${_id}`}
      className='transition duration-200 ease-linear bg-white cursor-pointer hover:shadow-xl hover:-translate-y-[2px]'
    >
      <div className='relative w-full min-[412px]:h-48 h-60'>
        <img src={image} alt={name} className='object-cover w-full h-full' />
        <div className='absolute right-0 top-0 w-0 h-0 border-fourth border-x-[25px] border-t-[40px] border-b-[15px] border-b-transparent'></div>
        <div className='absolute top-[6px] right-0 flex flex-col text-xs w-[50px] justify-center items-center'>
          <span className='font-semibold text-secondary'>{handleDiscount(price_before_discount, price)}%</span>
          <span className='tracking-wider text-white'>{price_before_discount < price ? 'TĂNG' : 'GIẢM'}</span>
        </div>
      </div>
      <div className='p-2'>
        <h3 className='leading-5 line-clamp-2'>{name}</h3>
        <div className='flex items-center gap-4 mt-[10px] xl:gap-2 2xl:gap-1'>
          <span className='text-base line-through text-grayDark opacity-70 md:text-xs xl:text-sm min-[412px]:text-sm'>
            ₫{formatCurrency(price_before_discount)}
          </span>
          <span className='text-base md:text-xs text-primary xl:text-sm 2xl:text-base min-[412px]:text-sm'>
            ₫{formatCurrency(price)}
          </span>
        </div>
        <div className='flex items-center gap-4 mt-2 md:justify-between'>
          <div className='flex items-center gap-[2px]'>{handleRating(rating, 12)}</div>
          <span className='text-sm md:text-xs xl:text-sm'>Đã bán {formatNumberToSocialStyle(sold)}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
