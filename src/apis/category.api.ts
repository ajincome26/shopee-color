import { Category } from '~/types/category.type'
import { ResponseSuccess } from '~/types/utils.type'
import instance from '~/utils/instance'

const categoryApi = {
  getCategories: () => instance.get<ResponseSuccess<Category[]>>('/categories')
}

export default categoryApi
