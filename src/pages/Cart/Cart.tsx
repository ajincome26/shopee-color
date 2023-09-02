import Swal from 'sweetalert2'
import purchaseApi from '~/apis/purchase.api'
import icons from '~/utils/icons'
import delivery from '../../assets/free-delivery.png'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { QuantityController } from '~/components/QuantityController'
import { purchasesStatus } from '~/constants/purchase'
import { Purchase, PurchaseListStatus } from '~/types/purchase.type'
import { produce } from 'immer'
import { Popover } from '~/components/Popover'
import { Link } from 'react-router-dom'
import { formatCurrency, generateNameId, handleDiscount } from '~/utils/utils'
import { Checkbox } from '~/components/Checkbox'
import { Button } from '~/components/Button'
import { keyBy } from 'lodash'

const { PiCaretUpBold } = icons

interface ExtendedPurchase extends Purchase {
  checked: boolean
  disabled: boolean
}

const Cart = () => {
  const queryClient = useQueryClient()
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked === true)
  const purchaseIds: string[] = []

  const { data, refetch } = useQuery({
    queryKey: ['purchases', purchasesStatus.INCART],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.INCART as PurchaseListStatus }),
    staleTime: 10000
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.updatePurchase(body),
    onSuccess: () => refetch()
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: (body: string[]) => purchaseApi.deletePurchase(body)
  })
  const purchaseInCart = data?.data.data
  purchaseInCart?.forEach((item) => purchaseIds.push(item._id))

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObj = keyBy(prev, '_id')
      return purchaseInCart
        ? purchaseInCart.map((purchase) => ({
            ...purchase,
            checked: Boolean(extendedPurchaseObj[purchase._id]?.checked),
            disabled: false
          }))
        : []
    })
    // Boolean(extendedPurchase.filter((item) => item._id === purchase._id)[0]?.checked)
  }, [purchaseInCart])

  const handleCheckedProduct = (indexPurchase: number, e: React.ChangeEvent<HTMLInputElement>) => {
    // Dùng immer
    setExtendedPurchase(
      produce((draf) => {
        draf[indexPurchase].checked = e.target.checked
      })
    )
    // Cách cơ bản
    // setExtendedPurchase((prev) =>
    //   prev.map((item, index) => (index === indexPurchase ? { ...item, checked: e.target.checked } : item))
    // )
  }
  const handleCheckedAll = () => {
    setExtendedPurchase((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
    // or checked: e.target.checked
  }
  const handleQuantity = (indexPurchase: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase[indexPurchase]
      setExtendedPurchase(
        produce((draf) => {
          draf[indexPurchase].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleTypeQuantity = (indexPurchase: number, value: number, enable: boolean) => {
    if (enable) {
      setExtendedPurchase(
        produce((draf) => {
          draf[indexPurchase].buy_count = value
        })
      )
    }
  }
  const handleDeletePurchase = (purchase_id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePurchaseMutation.mutate([purchase_id], {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['purchases', purchasesStatus.INCART] })
            toast.success(data.data.message, { autoClose: 1000 })
          }
        })
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }
  const handleDeletePurchases = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePurchaseMutation.mutate(purchaseIds, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['purchases', purchasesStatus.INCART] })
            toast.success(data.data.message, { autoClose: 1000 })
          }
        })
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  if (!purchaseInCart) return null

  return (
    <div className='bg-gray'>
      <div className='container py-5'>
        <div className='overflow-auto '>
          <div className='min-w-[1000px]'>
            <div className='flex items-center px-10 py-5 text-[15px] bg-white text-secondary shadow-lg rounded-sm'>
              <div className='flex gap-5 basis-2/5'>
                <Checkbox checked={isAllChecked} onChange={handleCheckedAll} />
                <span>Sản phẩm</span>
              </div>
              <div className='flex items-center justify-center basis-3/5'>
                <span className='text-center basis-2/5'>Đơn giá</span>
                <span className='text-center basis-1/5'>Số lượng</span>
                <span className='text-center basis-1/5'>Số tiền</span>
                <span className='text-center basis-1/5'>Thao tác</span>
              </div>
            </div>
            <div className='flex flex-col gap-3 my-4 px-5 py-5 text-[15px] bg-white text-secondary shadow-sm rounded-sm'>
              {extendedPurchase.map((purchase) => {
                const indexPurchase = extendedPurchase.findIndex((item) => item._id === purchase._id)
                return (
                  <div key={purchase._id} className='flex items-center p-5 border rounded-sm border-grayBox'>
                    <div className='flex items-center gap-5 basis-2/5'>
                      <Checkbox checked={purchase.checked} onChange={(e) => handleCheckedProduct(indexPurchase, e)} />
                      <div className='flex items-center gap-2'>
                        <Link
                          to={generateNameId(purchase.product.name, purchase.product._id)}
                          className='w-20 h-20 overflow-hidden rounded shadow cursor-pointer shrink-0'
                        >
                          <img
                            src={purchase.product.image}
                            alt={purchase.product.name}
                            className='object-cover w-full h-full'
                          />
                        </Link>
                        <div className='flex flex-col gap-1'>
                          <Link
                            to={generateNameId(purchase.product.name, purchase.product._id)}
                            title={purchase.product.name}
                            className='cursor-pointer hover:opacity-90 line-clamp-2'
                          >
                            {purchase.product.name}
                          </Link>
                          <div className='w-12 h-5'>
                            <img src={delivery} alt='delivery' className='object-cover w-full h-full' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-center basis-3/5'>
                      <div className='flex flex-col gap-2 basis-2/5'>
                        <div className='flex items-center justify-center gap-3'>
                          <span className='line-through text-slate-400'>
                            ₫{formatCurrency(purchase.price_before_discount)}
                          </span>
                          <span>₫{formatCurrency(purchase.price)}</span>
                        </div>
                        <div className='flex items-center justify-center gap-3 text-sm'>
                          <span className='text-third'>
                            {`${purchase.price_before_discount < purchase.price ? 'Tăng' : 'Giảm'} ${handleDiscount(
                              purchase.price_before_discount,
                              purchase.price
                            )}%`}
                          </span>
                          <span className='px-3 py-1 text-xs text-white bg-primary'>Đã cập nhật</span>
                        </div>
                      </div>
                      <div className='text-center basis-1/5'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          onIncrease={(value) =>
                            handleQuantity(indexPurchase, value, value <= purchase.product.quantity)
                          }
                          onDecrease={(value) => handleQuantity(indexPurchase, value, value >= 1)}
                          onType={(value) =>
                            handleTypeQuantity(indexPurchase, value, value >= 1 && value <= purchase.product.quantity)
                          }
                          onFocusOut={(value) =>
                            handleQuantity(
                              indexPurchase,
                              value,
                              value >= 1 &&
                                value <= purchase.product.quantity &&
                                value !== purchaseInCart[indexPurchase].buy_count
                            )
                          }
                          disabled={purchase.disabled}
                        />
                      </div>
                      <span className='text-center basis-1/5 text-third'>
                        ₫{formatCurrency(purchase.price * purchase.buy_count)}
                      </span>
                      <button
                        className='text-center basis-1/5 hover:text-red-700'
                        onClick={() => handleDeletePurchase(purchase._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className='sticky bottom-0 items-center px-10 py-5 bg-white border rounded-sm shadow-2xl border-slate-200 lg:justify-between md:flex text-secondary md:gap-20 lg:gap-0'>
          <div className='flex gap-8 text-[15px] lg:text-base'>
            <Checkbox checked={isAllChecked} onChange={handleCheckedAll}>
              Chọn tất cả ({purchaseInCart.length})
            </Checkbox>
            <button className='cursor-pointer hover:text-third' onClick={handleDeletePurchases}>
              Xóa
            </button>
          </div>

          <div className='items-center gap-5 mt-4 lg:flex lg:mt-0'>
            <Popover
              className='flex flex-col bg-white rounded-sm shadow-lg w-[470px] text-secondary p-6'
              placement='top-end'
              popover={
                <>
                  <span className='pb-3 text-lg border-b border-grayBox'>Chi tiết khuyến mãi</span>
                  <div className='flex items-center justify-between py-3 border-b border-grayBox'>
                    <span>Tổng tiền hàng</span>
                    <span>₫0</span>
                  </div>
                  <div className='flex items-center justify-between py-3 border-b border-grayBox'>
                    <span>Giảm giá sản phẩm</span>
                    <span>-₫100.000</span>
                  </div>
                  <div className='py-3'>
                    <div className='flex items-center justify-between mb-2'>
                      <span>Tiết kiệm</span>
                      <span>-₫100.000</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span>Tổng số tiền</span>
                      <span>₫100.000</span>
                    </div>
                    <span className='block mt-2 text-sm text-end text-slate-400'>Số tiền cuối cùng thanh toán</span>
                  </div>
                </>
              }
            >
              <div className='flex flex-col gap-1 mb-4 lg:gap-2 lg:mb-0'>
                <div className='flex items-center gap-3'>
                  <span>Tổng thanh toán (0 sản phẩm):</span>
                  <span className='text-xl lg:text-2xl text-third'>₫0</span>
                  <PiCaretUpBold color='#2c3e50' />
                </div>
                <div className='lg:flex items-center justify-end gap-6 text-[15px] text-primary'>
                  <span>Tiết kiệm</span>
                  <span className='ml-5'>₫0</span>
                </div>
              </div>
            </Popover>
            <Button className='px-10 py-2 text-sm uppercase lg:px-16 lg:py-3 lg:text-base'>Mua ngay</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
