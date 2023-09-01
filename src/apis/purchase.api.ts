import instance from '~/utils/instance'
import { ResponseSuccess } from '~/types/utils.type'
import { Purchase, PurchaseListStatus } from '~/types/purchase.type'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    instance.post<ResponseSuccess<Purchase>>('/purchases/add-to-cart', body),
  getPurchaseList: (params: { status: PurchaseListStatus }) =>
    instance.get<ResponseSuccess<Purchase[]>>('/purchases', {
      params
    }),
  updatePurchase: (body: { product_id: string; buy_count: number }) =>
    instance.put<ResponseSuccess<Purchase>>('/purchases/update-purchase', body),
  buyPurchase: (body: { product_id: string; buy_count: number }[]) =>
    instance.post<ResponseSuccess<Purchase[]>>('/purchases/buy-products', body),
  deletePurchase: (purchaseIds: string[]) =>
    instance.delete<ResponseSuccess<{ deleted_count: number }>>('/purchases', {
      data: purchaseIds
    })
}

export default purchaseApi
