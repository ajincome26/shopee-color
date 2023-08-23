import classNames from 'classnames'
import { Link } from 'react-router-dom'
import icons from '~/utils/icons'

interface Props {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const { PiCaretLeftBold, PiCaretRightBold, BsThreeDots } = icons
const RANGE = 2

const Pagination = ({ currentPage, setCurrentPage, pageSize }: Props) => {
  let dotAfter = false
  let dotBefore = false
  const renderDotAfter = (index: number) => {
    if (dotAfter === false) {
      dotAfter = true
      return (
        <Link
          to='/'
          key={index}
          className='flex items-center justify-center h-8 px-3 leading-tight bg-white cursor-default text-secondary'
        >
          <BsThreeDots />
        </Link>
      )
    }
    return null
  }
  const renderDotBefore = (index: number) => {
    if (dotBefore === false) {
      dotBefore = true
      return (
        <Link
          to='/'
          key={index}
          className='flex items-center justify-center h-8 px-3 leading-tight bg-white cursor-default text-secondary'
        >
          <BsThreeDots />
        </Link>
      )
    }
    return null
  }
  return (
    <div className='flex flex-wrap items-center justify-center gap-1 mb-4'>
      <Link
        to='/'
        className='flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] rounded-l-lg border-secondary text-secondary hover:bg-slate-50 hover:text-third'
      >
        <PiCaretLeftBold />
      </Link>

      {Array(pageSize)
        .fill(0)
        .map((_, index) => {
          const pageNumber = index + 1
          if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber <= pageSize - RANGE) {
            return renderDotAfter(index)
          } else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
            if (pageNumber > RANGE && pageNumber < currentPage - RANGE) {
              return renderDotBefore(index)
            } else if (pageNumber > currentPage + RANGE && pageNumber <= pageSize - RANGE) {
              return renderDotAfter(index)
            }
          } else if (pageNumber > RANGE && pageNumber < currentPage - RANGE && pageNumber < pageSize - RANGE) {
            return renderDotBefore(index)
          }
          return (
            <Link
              to={`/`}
              key={index}
              onClick={() => setCurrentPage(pageNumber)}
              className={classNames(
                'flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] text-secondary hover:bg-slate-50 hover:text-third',
                {
                  'border-third': pageNumber === currentPage,
                  'border-transparent': pageNumber !== currentPage
                }
              )}
            >
              {pageNumber}
            </Link>
          )
        })}

      <Link
        to='/'
        className='flex items-center justify-center h-8 px-3 leading-tight bg-white border-[2px] rounded-r-lg border-secondary text-secondary hover:bg-slate-50 hover:text-third'
      >
        <PiCaretRightBold />
      </Link>
    </div>
  )
}

export default Pagination
