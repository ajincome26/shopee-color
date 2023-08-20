// import { useMutation, useQuery } from '@tanstack/react-query'
// import { getProducts } from '~/apis/auth.api'
import { Popover } from '~/components/Popover'
// import { useQueryString } from '~/hooks/useQueryString'
import icons from '~/utils/icons'
import { ProductItem } from './ProductItem'

const { PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold } = icons

// const LIMIT = 20
interface Props {
  className?: string
}

const SortListOption = ({ className }: Props) => {
  // const queryString: { page?: string } = useQueryString()
  // const page = Number(queryString.page) || 1

  // const productsQuery = useQuery({
  //   queryKey: ['products', page],
  //   queryFn: () => getProducts(page, LIMIT)
  // })

  return (
    <div className={className}>
      <div className='flex items-center flex-wrap sm:flex-col sm:items-start lg:items-center lg:flex-row lg:justify-between bg-[#dde0e5] mt-3 text-secondary'>
        <div className='flex flex-col lg:items-center lg:flex-row'>
          <div className='px-3 pt-3 lg:pt-0'>Sắp xếp theo</div>

          <div className='flex flex-wrap items-center gap-2 p-3'>
            <button className='h-10 px-4 py-2 text-white rounded-md bg-primary'>Mới nhất</button>
            <button className='h-10 px-4 py-2 bg-white rounded-md'>Phổ biến</button>
            <button className='h-10 px-4 py-2 bg-white rounded-md'>Bán chạy</button>
            <Popover
              className='flex flex-col w-48 bg-white rounded-sm shadow-lg'
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
              <div className='flex items-center justify-between w-48 h-10 px-4 py-2 md:w-32 xl:w-48'>
                <span>Giá</span>
                <PiCaretDownBold />
              </div>
            </Popover>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3 px-3'>
          <div className='inline-block'>
            <span className='text-primary'>1</span>
            <span>/3</span>
          </div>
          <div className='flex items-center shadow-lg'>
            <button className='flex items-center justify-center w-8 h-8 bg-grayBox' disabled>
              <PiCaretLeftBold />
            </button>
            <button className='flex items-center justify-center w-8 h-8 bg-white hover:opacity-80'>
              <PiCaretRightBold />
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-3 my-4 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-5 text-secondary'>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  )
}

export default SortListOption
