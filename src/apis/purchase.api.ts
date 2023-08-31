import instance from '~/utils/instance'
import { ResponseSuccess } from '~/types/utils.type'
import { Purchase, PurchaseListStatus } from '~/types/purchase.type'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    instance.post<ResponseSuccess<Purchase>>('/purchases/add-to-cart', body),
  getPurchaseList: (params: { status: PurchaseListStatus }) =>
    instance.get<ResponseSuccess<Purchase[]>>('/purchases', {
      params
    })
}

export default purchaseApi
