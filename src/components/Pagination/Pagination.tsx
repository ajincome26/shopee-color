import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import { path } from '~/constants/path'
import { QueryParamsConfig } from '~/pages/ProductList/ProductList'
import icons from '~/utils/icons'

interface Props {
  queryParamsConfig: QueryParamsConfig
  pageSize: number
}

const { PiCaretLeftBold, PiCaretRightBold, BsThreeDots } = icons
const RANGE = 2

const Pagination = ({ queryParamsConfig, pageSize }: Props) => {
  const page = Number(queryParamsConfig.page)
  let dotAfter = false
  let dotBefore = false
  const renderDotAfter = (index: number) => {
    if (dotAfter === false) {
      dotAfter = true
      return (
        <span key={index} className='flex items-center justify-center h-8 px-3 leading-tight bg-white text-secondary'>
          <BsThreeDots />
        </span>
      )
    }
    return null
  }
  const renderDotBefore = (index: number) => {
    if (dotBefore === false) {
      dotBefore = true
      return (
        <span key={index} className='flex items-center justify-center h-8 px-3 leading-tight bg-white text-secondary'>
          <BsThreeDots />
        </span>
      )
    }
    return null
  }
  return (
    <div className='flex flex-wrap items-center justify-center gap-1 pb-6'>
      {page === 1 ? (
        <span className='flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] rounded-l-lg border-secondary text-secondary opacity-80'>
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
          className='flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] rounded-l-lg border-secondary text-secondary hover:bg-slate-50 hover:text-third'
        >
          <PiCaretLeftBold />
        </Link>
      )}

      {Array(pageSize)
        .fill(0)
        .map((_, index) => {
          const pageNumber = index + 1
          if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
            return renderDotAfter(index)
          } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
            if (pageNumber > RANGE && pageNumber < page - RANGE) {
              return renderDotBefore(index)
            } else if (pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
              return renderDotAfter(index)
            }
          } else if (pageNumber > RANGE && pageNumber < page - RANGE && pageNumber < pageSize - RANGE) {
            return renderDotBefore(index)
          }
          return (
            <Link
              to={{
                pathname: path.HOME,
                search: createSearchParams({
                  ...queryParamsConfig,
                  page: pageNumber.toString()
                }).toString()
              }}
              key={index}
              className={classNames(
                'flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] text-secondary hover:bg-slate-50 hover:text-third',
                {
                  'border-third': pageNumber === page,
                  'border-transparent': pageNumber !== page
                }
              )}
            >
              {pageNumber}
            </Link>
          )
        })}

      {page === pageSize ? (
        <span className='flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] rounded-r-lg border-secondary text-secondary opacity-80'>
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
          className='flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] rounded-r-lg border-secondary text-secondary hover:bg-slate-50 hover:text-third'
        >
          <PiCaretRightBold />
        </Link>
      )}
    </div>
  )
}

export default Pagination
