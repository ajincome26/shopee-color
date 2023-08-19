import { useForm } from 'react-hook-form'
import { Button } from '~/components/Button'
import { InputSearch } from '~/components/Input'
import icons from '~/utils/icons'

const { BsListUl, LiaFilterSolid, AiFillStar, AiOutlineStar } = icons

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
      <div className='flex items-center gap-4 pt-8 pb-4 mt-2 font-semibold border-b border-b-grayBox'>
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
      <div className='flex flex-col gap-3 p-4 border-b border-b-grayBox'>
        <h3>Khoảng giá</h3>
        <form onSubmit={handleSubmit(handleFilterPrice)}>
          <div className='flex items-center gap-3'>
            <InputSearch
              className='px-2 py-1 text-sm bg-white placeholder:normal-case focus:border-secondary focus:border'
              name='minValue'
              placeholder='VND Từ'
              type='number'
              register={register}
            />
            <div className='text-secondary'>-</div>
            <InputSearch
              className='px-2 py-1 text-sm bg-white placeholder:normal-case focus:border-secondary focus:border'
              name='maxValue'
              placeholder='VND Đến'
              type='number'
              register={register}
            />
          </div>
          <Button type='submit' className='py-2 mt-4 md:mx-0 md:w-full'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='flex flex-col gap-3 p-4 border-b border-b-grayBox'>
        <h3>Đánh giá</h3>
        <div className='flex flex-col gap-2 px-5'>
          <div className='flex items-center gap-2 transition cursor-pointer hover:opacity-80'>
            {Array(5)
              .fill(0)
              .map((index) => (
                <AiFillStar key={index} color='#0891b2' />
              ))}
          </div>
          <div className='flex items-center gap-2 transition cursor-pointer hover:opacity-80'>
            {Array(4)
              .fill(0)
              .map((index) => (
                <AiFillStar key={index} color='#0891b2' />
              ))}
            <AiOutlineStar color='#0891b2' />
            trở lên
          </div>
          <div className='flex items-center gap-2 transition cursor-pointer hover:opacity-80'>
            {Array(3)
              .fill(0)
              .map((index) => (
                <AiFillStar key={index} color='#0891b2' />
              ))}
            <AiOutlineStar color='#0891b2' />
            <AiOutlineStar color='#0891b2' />
            trở lên
          </div>
          <div className='flex items-center gap-2 transition cursor-pointer hover:opacity-80'>
            <AiFillStar color='#0891b2' />
            <AiFillStar color='#0891b2' />
            {Array(3)
              .fill(0)
              .map((index) => (
                <AiOutlineStar key={index} color='#0891b2' />
              ))}
            trở lên
          </div>
          <div className='flex items-center gap-2 transition cursor-pointer hover:opacity-80'>
            <AiFillStar color='#0891b2' />
            {Array(4)
              .fill(0)
              .map((index) => (
                <AiOutlineStar key={index} color='#0891b2' />
              ))}
            trở lên
          </div>
        </div>
        <Button type='submit' className='py-2 md:mx-0 md:w-full'>
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}

export default FilterPanel
