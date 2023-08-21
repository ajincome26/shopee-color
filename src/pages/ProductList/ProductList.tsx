import { FilterPanel } from './FilterPanel'
import { SortListOption } from './SortOption'

const ProductList = () => {
  return (
    <div className='bg-gray'>
      <div className='container items-start gap-3 md:flex'>
        <FilterPanel className='basis-1/4 2xl:basis-1/5' />
        <SortListOption className='basis-3/4 2xl:basis-4/5' />
      </div>
    </div>
  )
}

export default ProductList
