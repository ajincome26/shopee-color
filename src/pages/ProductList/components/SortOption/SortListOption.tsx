import icons from '~/utils/icons'
import classNames from 'classnames'
import { ProductListParams } from '~/types/product.type'
import { path } from '~/constants/path'
import { order as orderConst, sortBy } from '~/constants/product'
import omit from 'lodash/omit'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { QueryParamsConfig } from '~/hooks/useQueryConfig'

const { PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold } = icons

interface Props {
  className?: string
  queryParamsConfig: QueryParamsConfig
  pageSize: number
}

const SortListOption = ({ className, queryParamsConfig, pageSize }: Props) => {
  const navigate = useNavigate()
  const page = Number(queryParamsConfig.page)
  const { sort_by = sortBy.CREATED_AT, order = '' } = queryParamsConfig

  const isActiveSortBy = (sortByValue: Exclude<ProductListParams['sort_by'], undefined>) => {
    return sortByValue === sort_by
  }
  const handleNavigateSortBy = (sortByValue: Exclude<ProductListParams['sort_by'], undefined>) => {
    return navigate({
      pathname: path.HOME,
      search: createSearchParams(
        omit(
          {
            ...queryParamsConfig,
            sort_by: sortByValue
          },
          'order'
        )
      ).toString()
    })
  }
  const handleNavigatePrice = (orderValue: Exclude<ProductListParams['order'], undefined>) => {
    return navigate({
      pathname: path.HOME,
      search: createSearchParams({
        ...queryParamsConfig,
        sort_by: sortBy.PRICE,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className={className}>
      <div className='flex items-center flex-wrap sm:flex-col sm:items-start lg:items-center lg:flex-row lg:justify-between bg-[#dde0e5] py-3 text-secondary'>
        <div className='flex flex-col lg:items-center lg:flex-row'>
          <div className='px-3 pt-3 lg:pt-0'>Sắp xếp theo</div>

          <div className='flex flex-wrap items-center gap-2 p-3'>
            <button
              className={classNames('h-10 px-4 py-2 rounded-md hover:bg-opacity-80', {
                'bg-primary text-white': isActiveSortBy('createdAt'),
                'bg-white': !isActiveSortBy('createdAt')
              })}
              onClick={() => handleNavigateSortBy('createdAt')}
            >
              Mới nhất
            </button>
            <button
              className={classNames('h-10 px-4 py-2 rounded-md hover:bg-opacity-80', {
                'bg-primary text-white': isActiveSortBy('view'),
                'bg-white': !isActiveSortBy('view')
              })}
              onClick={() => handleNavigateSortBy('view')}
            >
              Phổ biến
            </button>
            <button
              className={classNames('h-10 px-4 py-2 rounded-md hover:bg-opacity-80', {
                'bg-primary text-white': isActiveSortBy('sold'),
                'bg-white': !isActiveSortBy('sold')
              })}
              onClick={() => handleNavigateSortBy('sold')}
            >
              Bán chạy
            </button>
            <div className='relative'>
              <select
                className={classNames(
                  'flex items-center justify-between w-48 h-10 px-4 py-2 rounded-md outline-none cursor-pointer md:grow xl:grow-0 xl:w-48 hover:bg-opacity-80',
                  { 'bg-primary text-white': isActiveSortBy('price'), 'bg-white': !isActiveSortBy('price') }
                )}
                value={order}
                onChange={(e) => handleNavigatePrice(e.target.value as Exclude<ProductListParams['order'], undefined>)}
              >
                <option value='' className='bg-white text-secondary' disabled>
                  Giá
                </option>
                <option value={orderConst.ASC} className='bg-white text-secondary'>
                  Giá: Thấp đến cao
                </option>
                <option value={orderConst.DESC} className='bg-white text-secondary'>
                  Giá: Cao đến thấp
                </option>
              </select>
              <div className='absolute top-1/2 right-4 translate-y-[-50%] cursor-pointer'>
                <PiCaretDownBold color={order === '' ? '' : 'white'} />
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3 px-3'>
          <div className='inline-block'>
            <span className='text-primary'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='flex items-center shadow-lg'>
            {page === 1 ? (
              <span className='flex items-center justify-center w-8 h-8 cursor-not-allowed bg-grayBox'>
                <PiCaretLeftBold />
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.HOME,
                  search: createSearchParams({
                    ...queryParamsConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex items-center justify-center w-8 h-8 bg-white hover:opacity-80'
              >
                <PiCaretLeftBold />
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex items-center justify-center w-8 h-8 cursor-not-allowed bg-grayBox'>
                <PiCaretRightBold />
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.HOME,
                  search: createSearchParams({
                    ...queryParamsConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex items-center justify-center w-8 h-8 bg-white hover:opacity-80'
              >
                <PiCaretRightBold />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortListOption
