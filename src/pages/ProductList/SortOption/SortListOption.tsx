import { useQuery } from '@tanstack/react-query'
import productApi from '~/apis/product.api'
import { useQueryParams } from '~/hooks/useQueryParams'
import icons from '~/utils/icons'
import { ProductItem } from './ProductItem'

const { PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold } = icons

// const LIMIT = 20
interface Props {
  className?: string
}

const SortListOption = ({ className }: Props) => {
  const queryParams = useQueryParams()

  const productsQuery = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryParams)
  })

  return (
    <div className={className}>
      <div className='flex items-center flex-wrap sm:flex-col sm:items-start lg:items-center lg:flex-row lg:justify-between bg-[#dde0e5] py-3 text-secondary'>
        <div className='flex flex-col lg:items-center lg:flex-row'>
          <div className='px-3 pt-3 lg:pt-0'>Sắp xếp theo</div>

          <div className='flex flex-wrap items-center gap-2 p-3'>
            <button className='h-10 px-4 py-2 text-white rounded-md bg-primary'>Mới nhất</button>
            <button className='h-10 px-4 py-2 bg-white rounded-md hover:bg-opacity-80'>Phổ biến</button>
            <button className='h-10 px-4 py-2 bg-white rounded-md hover:bg-opacity-80'>Bán chạy</button>
            {/* <Popover
              className='flex flex-col w-48 bg-white rounded-md shadow-lg'
              hoverClass='hover:bg-opacity-80 bg-white rounded-md'
              isFloatingArrow={false}
              placement='bottom-end'
              popover={
                <>
                  <div className='w-full px-4 py-2 text-sm cursor-pointer hover:text-primary hover:bg-slate-50'>
                    Giá
                  </div>
                  <div className='w-full px-4 py-2 text-sm cursor-pointer hover:text-primary hover:bg-slate-50'>
                    Giá: Thấp đến cao
                  </div>
                  <div className='w-full px-4 py-2 text-sm cursor-pointer hover:text-primary hover:bg-slate-50'>
                    Giá: Cao đến thấp
                  </div>
                </>
              }
            >
              <div className='flex items-center justify-between w-48 h-10 px-4 py-2 md:grow xl:grow-0 xl:w-48'>
                <span>Giá</span>
                <PiCaretDownBold />
              </div>
            </Popover> */}
            <div className='relative'>
              <select
                name='price'
                value=''
                className='flex items-center justify-between w-48 h-10 px-4 py-2 bg-white rounded-md outline-none cursor-pointer md:grow xl:grow-0 xl:w-48 hover:bg-opacity-80'
                onChange={() => {}}
              >
                <option value='optionTitle'>Giá</option>
                <option value='asc'>Giá: Thấp đến cao</option>
                <option value='desc'>Giá: Cao đến thấp</option>
              </select>
              <div className='absolute top-1/2 right-4 translate-y-[-50%] cursor-pointer'>
                <PiCaretDownBold />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3 px-3'>
          <div className='inline-block'>
            <span className='text-primary'>1</span>
            <span>/3</span>
          </div>
          <div className='flex items-center shadow-lg'>
            <button className='flex items-center justify-center w-8 h-8 cursor-not-allowed bg-grayBox'>
              <PiCaretLeftBold />
            </button>
            <button className='flex items-center justify-center w-8 h-8 bg-white hover:opacity-80'>
              <PiCaretRightBold />
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 min-[412px]:grid-cols-2 gap-3 pb-4 mt-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 text-secondary'>
        {productsQuery.data?.data.data.products.map((item) => <ProductItem key={item._id} product={item} />)}
      </div>
    </div>
  )
}

export default SortListOption
