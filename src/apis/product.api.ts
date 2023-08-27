import { Product, ProductList, ProductListParams } from '~/types/product.type'
import { ResponseSuccess } from '~/types/utils.type'
import instance from '~/utils/instance'

const productApi = {
  getProducts: (params: ProductListParams) =>
    instance.get<ResponseSuccess<ProductList>>('/products', {
      params
    }),
  getProduct: (id: string) => instance.get<ResponseSuccess<Product>>(`/products/${id}`)
}
export default productApi
