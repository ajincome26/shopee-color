import { path } from '~/constants/path'
import { Category } from '~/types/category.type'
import { ResponseSuccess } from '~/types/utils.type'
import instance from '~/utils/instance'

const categoryApi = {
  getCategories: () => instance.get<ResponseSuccess<Category[]>>(path.CATEGORIES)
}

export default categoryApi
