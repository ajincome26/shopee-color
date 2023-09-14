import Swal from 'sweetalert2'
import purchaseApi from '~/apis/purchase.api'
import icons from '~/utils/icons'
import delivery from '../../assets/free-delivery.png'
import { usePurchase } from '~/contexts/purchase.context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { QuantityController } from '~/components/QuantityController'
import { purchasesStatus } from '~/constants/purchase'
import { PurchaseListStatus } from '~/types/purchase.type'
import { produce } from 'immer'
import { Popover } from '~/components/Popover'
import { path } from '~/constants/path'
import { Link, useLocation } from 'react-router-dom'
import keyBy from 'lodash/keyBy'
import { formatCurrency, generateNameId, handleDiscount } from '~/utils/utils'
import { Checkbox } from '~/components/Checkbox'
import { Button } from '~/components/Button'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const { PiCaretUpBold } = icons

const Cart = () => {
  const { t } = useTranslation('cart')
  const location = useLocation()
  const purchaseId = (
    location.state as {
      purchase_id: string
    }
  )?.purchase_id
  const { extendedPurchase, setExtendedPurchase } = usePurchase()
  const isAllChecked = useMemo(
    () => extendedPurchase.every((purchase) => purchase.checked === true),
    [extendedPurchase]
  )
  const purchaseChecked = useMemo(() => extendedPurchase.filter((purchase) => purchase.checked), [extendedPurchase])

  const { data, refetch } = useQuery({
    queryKey: ['purchases', purchasesStatus.INCART],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchasesStatus.INCART as PurchaseListStatus }),
    staleTime: 10000
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => refetch()
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => refetch()
  })
  const buyPurchasesMutation = useMutation({
    mutationFn: purchaseApi.buyPurchase,
    onSuccess: () => refetch()
  })
  const purchaseInCart = data?.data.data

  useEffect(() => {
    return () => {
      window.history.replaceState(null, '')
    }
  }, [])
  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObj = keyBy(prev, '_id')
      return purchaseInCart
        ? purchaseInCart.map((purchase) => {
            const isIncludePurchase = purchase._id === purchaseId
            return {
              ...purchase,
              checked: isIncludePurchase || Boolean(extendedPurchaseObj[purchase._id]?.checked),
              disabled: false
            }
          })
        : []
    })
    // Boolean(extendedPurchase.filter((item) => item._id === purchase._id)[0]?.checked)
  }, [purchaseId, purchaseInCart, setExtendedPurchase])

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
      title: 'Bạn có chắc không?',
      text: 'Bạn sẽ không thể hoàn tác điều này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa ngay',
      cancelButtonText: 'Trở lại'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePurchaseMutation.mutate([purchase_id], {
          onSuccess: (data) => {
            Swal.fire('Đã xóa', data.data.message, 'success')
          }
        })
      }
    })
  }
  const handleDeletePurchases = () => {
    const purchaseIdsChecked: string[] = []
    purchaseChecked.map((purchase) => purchaseIdsChecked.push(purchase._id))
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: 'Bạn sẽ không thể hoàn tác điều này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa ngay',
      cancelButtonText: 'Trở lại'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePurchaseMutation.mutate(purchaseIdsChecked, {
          onSuccess: (data) => {
            Swal.fire('Đã xóa', data.data.message, 'success')
          }
        })
      }
    })
  }
  const handleBuyPurchases = () => {
    const purchaseBuyChecked: { product_id: string; buy_count: number }[] = []
    purchaseChecked.map((purchase) =>
      purchaseBuyChecked.push({ product_id: purchase.product._id, buy_count: purchase.buy_count })
    )
    if (purchaseChecked.length > 0) {
      buyPurchasesMutation.mutate(purchaseBuyChecked, {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000, position: 'top-center' })
        }
      })
    }
  }

  const paymentAmount = (type: 'total' | 'payment' | 'save') => {
    return purchaseChecked.reduce((result, current) => {
      if (type === 'payment') {
        result = result + current.price * current.buy_count
      } else if (type === 'total') {
        result = result + current.price_before_discount * current.buy_count
      } else if (type === 'save') {
        result = result + (current.price_before_discount - current.price) * current.buy_count
      }
      return result
    }, 0)
  }

  if (!purchaseInCart) return null

  return (
    <div>
      <Helmet>
        <title>Giỏ hàng | Shopee Color</title>
        <meta name='description' content='Xem danh sách thông tin sản phẩm đã được thêm vào giỏ hàng' />
      </Helmet>
      {purchaseInCart.length !== 0 ? (
        <div className='bg-gray'>
          <div className='container py-5'>
            <div className='overflow-auto '>
              <div className='min-w-[1000px]'>
                <div className='flex items-center px-10 py-5 text-[15px] bg-white text-secondary shadow-lg rounded-sm'>
                  <div className='flex gap-5 basis-2/5'>
                    <Checkbox checked={isAllChecked} onChange={handleCheckedAll} />
                    <span>{t('cart.product')}</span>
                  </div>
                  <div className='flex items-center justify-center basis-3/5'>
                    <span className='text-center basis-2/5'>{t('cart.unit price')}</span>
                    <span className='text-center basis-1/5'>{t('cart.quantity')}</span>
                    <span className='text-center basis-1/5'>{t('cart.total price')}</span>
                    <span className='text-center basis-1/5'>{t('cart.actions')}</span>
                  </div>
                </div>
                {/* render purchases */}
                <div className='flex flex-col gap-3 my-4 px-5 py-5 text-[15px] bg-white text-secondary shadow-sm rounded-sm'>
                  {extendedPurchase.map((purchase) => {
                    const indexPurchase = extendedPurchase.findIndex((item) => item._id === purchase._id)
                    return (
                      <div key={purchase._id} className='flex items-center p-5 border rounded-sm border-grayBox'>
                        <div className='flex items-center gap-5 basis-2/5'>
                          <Checkbox
                            checked={purchase.checked}
                            onChange={(e) => handleCheckedProduct(indexPurchase, e)}
                          />
                          <div className='flex items-center gap-2'>
                            <Link
                              to={generateNameId(purchase.product.name, purchase.product._id)}
                              className='w-20 h-20 overflow-hidden transition rounded shadow cursor-pointer hover:opacity-90 shrink-0'
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
                                className='transition cursor-pointer hover:text-primary line-clamp-2'
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
                                {`${
                                  purchase.price_before_discount < purchase.price ? 'Tăng' : `${t('cart.off')}`
                                } ${handleDiscount(purchase.price_before_discount, purchase.price)}%`}
                              </span>
                              <span className='px-3 py-1 text-xs text-white bg-primary'>{t('cart.updated')}</span>
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
                                handleTypeQuantity(
                                  indexPurchase,
                                  value,
                                  value >= 1 && value <= purchase.product.quantity
                                )
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
                            {t('cart.delete')}
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
                  {t('cart.select all')} ({purchaseInCart.length})
                </Checkbox>
                <button className='cursor-pointer hover:text-third' onClick={handleDeletePurchases}>
                  {t('cart.delete')}
                </button>
              </div>

              <div className='items-center gap-5 mt-4 lg:flex lg:mt-0'>
                <Popover
                  className='flex flex-col bg-white rounded-sm shadow-lg border border-gray w-[470px] text-secondary p-6'
                  placement='top-end'
                  popover={
                    <>
                      <span className='pb-3 text-lg border-b border-grayBox'>{t('cart.discount detail')}</span>
                      <div className='flex items-center justify-between py-3 border-b border-grayBox'>
                        <span>{t('cart.subtotal')}</span>
                        <span>₫{formatCurrency(paymentAmount('total'))}</span>
                      </div>
                      <div className='flex items-center justify-between py-3 border-b border-grayBox'>
                        <span>{t('cart.product discount')}</span>
                        <span>-₫{formatCurrency(paymentAmount('save'))}</span>
                      </div>
                      <div className='py-3'>
                        <div className='flex items-center justify-between mb-2'>
                          <span>{t('cart.saved')}</span>
                          <span className='text-third'>-₫{formatCurrency(paymentAmount('save'))}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span>{t('cart.total amount')}</span>
                          <span>₫{formatCurrency(paymentAmount('payment'))}</span>
                        </div>
                        <span className='block mt-2 text-sm text-end text-slate-400'>
                          {t('cart.final price shown at checkout')}
                        </span>
                      </div>
                    </>
                  }
                >
                  <div className='flex flex-col gap-1 mb-4 lg:gap-2 lg:mb-0'>
                    <div className='flex items-center gap-3'>
                      <span>
                        {t('cart.total')} ({purchaseChecked.length} {t('cart.items')}):
                      </span>
                      <span className='text-xl font-medium lg:text-2xl text-third'>
                        ₫{formatCurrency(paymentAmount('payment'))}
                      </span>
                      <PiCaretUpBold color='#2c3e50' />
                    </div>
                    <div className='lg:flex items-center justify-end gap-[30px] text-[15px] text-primary'>
                      <span>{t('cart.saved')}</span>
                      <span className='ml-5'>₫{formatCurrency(paymentAmount('save'))}</span>
                    </div>
                  </div>
                </Popover>
                <Button
                  className='px-10 py-2 text-sm uppercase lg:px-16 lg:py-3 lg:text-base'
                  onClick={handleBuyPurchases}
                  disabled={buyPurchasesMutation.isLoading}
                >
                  {t('cart.check out')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center py-5'>
          <div className='flex flex-col items-center'>
            <div className='rounded-full w-36 h-36'>
              <img
                src='https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg?w=740'
                alt='cart-empty'
                className='object-cover w-full h-full'
              />
            </div>
            <span className='text-slate-400'>Giỏ hàng của bạn còn trống</span>
            <Button to={path.HOME} className='px-8 py-2 mt-4 mb-6'>
              Mua ngay
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
