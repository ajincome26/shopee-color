import { FilterPanel } from './FilterPanel'
import { SortListOption } from './SortOption'

const ProductList = () => {
  return (
    <div className='bg-gray'>
      <div className='container flex items-start gap-3'>
        <FilterPanel className='basis-1/4' />
        <SortListOption className='basis-3/4' />
      </div>
    </div>
  )
}

export default ProductList
