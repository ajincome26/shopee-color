interface Props {
  className?: string
}

const SortListOption = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 p-3 mt-3 bg-grayField'>
          <span>Sắp xếp theo</span>
          <button className='h-10 px-4 py-2 text-white bg-primary'>Mới nhất</button>
          <button className='h-10 px-4 py-2 bg-white'>Phổ biến</button>
          <button className='h-10 px-4 py-2 bg-white'>Bán chạy</button>
          <select className='h-10 px-4 py-2'>
            <option>Giá</option>
            <option>Giá: Thấp đến cao</option>
            <option>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='p-3 mt-3'>
          <span className='mr-2'>1/3</span>
          <button className='w-8 h-8 bg-grayBox'>1</button>
          <button className='w-8 h-8 bg-white'>2</button>
        </div>
      </div>
    </div>
  )
}

export default SortListOption
