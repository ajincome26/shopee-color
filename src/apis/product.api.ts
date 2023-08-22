import { path } from '~/constants/path'
import { ProductList, ProductListParams } from '~/types/product.type'
import { ResponseSuccess } from '~/types/utils.type'
import instance from '~/utils/instance'

const productApi = {
  getProducts: (params: ProductListParams) =>
    instance.get<ResponseSuccess<ProductList>>(path.PRODUCTS, {
      params
    })
}
export default productApi
