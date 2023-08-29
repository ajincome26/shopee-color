import productApi from '~/apis/product.api'
import categoryApi from '~/apis/category.api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SortListOption } from './components/SortOption'
import { ProductListParams } from '~/types/product.type'
import { ProductItem } from './components/ProductItem'
import { path } from '~/constants/path'
import { Pagination } from '~/components/Pagination'
import { FilterPanel } from './components/FilterPanel'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from '~/hooks/useQueryConfig'

const ProductList = () => {
  const navigate = useNavigate()
  const queryParamsConfig = useQueryConfig()
  const productsQuery = useQuery({
    queryKey: ['products', queryParamsConfig],
    queryFn: () => productApi.getProducts(queryParamsConfig as ProductListParams),
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
    keepPreviousData: true
  })

  // Scroll Top when paginate
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [productsQuery.data])

  // Xử lý lỗi khi truy cập với page > pageSize
  useEffect(() => {
    if (productsQuery.data?.data.data.products.length === 0) {
      navigate({
        pathname: path.HOME,
        search: createSearchParams({
          ...queryParamsConfig,
          page: '1'
        }).toString()
      })
    }
  }, [navigate, productsQuery.data?.data.data.products, queryParamsConfig])

  return (
    <div className='bg-gray'>
      <div className='container items-start gap-3 md:flex'>
        {productsQuery.data && (
          <>
            <FilterPanel
              className='basis-1/4 2xl:basis-1/5'
              queryParamsConfig={queryParamsConfig}
              categories={categoriesQuery.data?.data.data || []}
            />
            <div className='basis-3/4 2xl:basis-4/5'>
              <SortListOption
                queryParamsConfig={queryParamsConfig}
                pageSize={productsQuery.data.data.data.pagination.page_size}
              />
              <div className='grid grid-cols-1 min-[412px]:grid-cols-2 gap-3 pb-6 mt-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 text-secondary'>
                {productsQuery.data.data.data.products.map((item) => (
                  <ProductItem key={item._id} product={item} />
                ))}
              </div>
              <Pagination
                queryParamsConfig={queryParamsConfig}
                pageSize={productsQuery.data.data.data.pagination.page_size}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductList
