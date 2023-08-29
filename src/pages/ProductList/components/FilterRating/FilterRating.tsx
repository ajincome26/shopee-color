import { path } from '~/constants/path'
import { handleStar } from '~/utils/utils'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { QueryParamsConfig } from '~/hooks/useQueryConfig'

interface Props {
  queryParamsConfig: QueryParamsConfig
}

const FilterRating = ({ queryParamsConfig }: Props) => {
  const navigate = useNavigate()

  const handleFilterRating = (rate: string) => {
    navigate({
      pathname: path.HOME,
      search: createSearchParams({
        ...queryParamsConfig,
        rating_filter: rate
      }).toString()
    })
  }
  return (
    <div className='flex flex-col gap-3 py-4 border-b md:px-4 border-b-grayBox'>
      <h3>Đánh giá</h3>
      <div className='flex flex-col gap-1 px-5 text-sm lg:text-base lg:px-5 md:px-0'>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                className='flex items-center h-6 gap-1 transition cursor-pointer lg:gap-2 hover:opacity-80'
                onClick={() => handleFilterRating(String(5 - index))}
              >
                {handleStar(5 - index)}
                {index === 0 ? '' : 'trở lên'}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default FilterRating
