import { useForm } from 'react-hook-form'
import { Button } from '~/components/Button'
import { InputSearch } from '~/components/Input'
import icons from '~/utils/icons'
import { handleStar } from '~/utils/utils'

const { BsListUl, LiaFilterSolid } = icons

interface PriceValue {
  minValue: string
  maxValue: string
}
interface Props {
  className?: string
}

const handleFilterPrice = () => {}

const FilterPanel = ({ className }: Props) => {
  const { register, handleSubmit } = useForm<PriceValue>()
  return (
    <div className={`${className} text-secondary`}>
      <div className='flex items-center gap-4 pt-8 pb-4 font-semibold border-b md:mt-2 border-b-grayBox'>
        <BsListUl />
        <h2>Tất cả danh mục</h2>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <span>Điện thoại</span>
        <span>Đồng hồ</span>
        <span>Áo thun</span>
      </div>
      <div className='flex items-center gap-3 pb-4 mt-3 font-semibold border-b border-b-grayBox'>
        <LiaFilterSolid />
        <h2>Bộ lọc tìm kiếm</h2>
      </div>
      <div className='flex flex-col gap-3 py-4 border-b md:px-4 border-b-grayBox'>
        <h3>Khoảng giá</h3>
        <form onSubmit={handleSubmit(handleFilterPrice)}>
          <div className='flex items-center gap-3'>
            <InputSearch
              className='px-2 py-1 text-sm bg-white placeholder:normal-case focus:border-secondary focus:border'
              name='minValue'
              placeholder='₫ Từ'
              type='number'
              register={register}
            />
            <div className='text-secondary'>-</div>
            <InputSearch
              className='px-2 py-1 text-sm bg-white placeholder:normal-case focus:border-secondary focus:border'
              name='maxValue'
              placeholder='₫ Đến'
              type='number'
              register={register}
            />
          </div>
          <Button type='submit' className='w-full py-2 mt-4'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='flex flex-col gap-3 py-4 border-b md:px-4 border-b-grayBox'>
        <h3>Đánh giá</h3>
        <div className='flex flex-col gap-1 px-5 text-sm lg:text-base lg:gap-2 lg:px-5 md:px-0'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className='flex items-center gap-1 mb-1 transition cursor-pointer lg:gap-2 hover:opacity-80'
              >
                {handleStar(5 - index)}
              </div>
            ))}
        </div>
        <Button type='submit' className='w-full py-2 md:mx-0'>
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}

export default FilterPanel
