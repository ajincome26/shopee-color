import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import purchaseApi from '~/apis/purchase.api'
import { Checkbox } from '~/components/Checkbox'
import { QuantityController } from '~/components/QuantityController'
import { purchasesStatus } from '~/constants/purchase'
import { PurchaseListStatus } from '~/types/purchase.type'
import { formatCurrency, generateNameId, handleDiscount } from '~/utils/utils'
import delivery from '../../assets/free-delivery.png'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { Popover } from '~/components/Popover'
import icons from '~/utils/icons'
import { Button } from '~/components/Button'

const { PiCaretUpBold } = icons

const Cart = () => {
  const [buyCount, setBuyCount] = useState(1)
  const [checked, setChecked] = useState(false)
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['purchases', purchasesStatus.INCART],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.INCART as PurchaseListStatus }),
    staleTime: 10000
  })
  const deleteMutation = useMutation({
    mutationFn: (body: string[]) => purchaseApi.deletePurchase(body)
  })
  const purchaseInCart = data?.data.data
  const purchaseIds: string[] = []
  purchaseInCart?.forEach((item) => purchaseIds.push(item._id))
  const handleQuantity = (value: number) => {
    setBuyCount(value)
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
        deleteMutation.mutate([purchase_id], {
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
        deleteMutation.mutate(purchaseIds, {
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
                <Checkbox checked={checked} onClick={() => setChecked((prev) => !prev)} />
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
              {purchaseInCart.map((purchase) => (
                <div key={purchase._id} className='flex items-center p-5 border rounded-sm border-grayBox'>
                  <div className='flex items-center gap-5 basis-2/5'>
                    <Checkbox checked={checked} onClick={() => setChecked((prev) => !prev)} />
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
                        onIncrease={handleQuantity}
                        onDecrease={handleQuantity}
                        onType={handleQuantity}
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
              ))}
            </div>
          </div>
        </div>

        <div className='sticky bottom-0 items-center px-10 py-5 bg-white border rounded-sm shadow-2xl border-slate-200 lg:justify-between md:flex text-secondary md:gap-20 lg:gap-0'>
          <div className='flex gap-8 text-[15px] lg:text-base'>
            <Checkbox checked={checked} onClick={() => setChecked((prev) => !prev)}>
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
