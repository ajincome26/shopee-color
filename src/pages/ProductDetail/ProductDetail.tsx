import sellerImage from '../../assets/hot-price-100.png'
import purchaseApi from '~/apis/purchase.api'
import productApi from '~/apis/product.api'
import icons from '~/utils/icons'
import freeshiping from '../../assets/free-shipping-64.png'
import DOMPurify from 'dompurify'
import classNames from 'classnames'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { QuantityController } from '~/components/QuantityController'
import { purchasesStatus } from '~/constants/purchase'
import { ProductListParams } from '~/types/product.type'
import { ProductItem } from '../ProductList/components/ProductItem'
import { Popover } from '~/components/Popover'
import { path } from '~/constants/path'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, handleDiscount, handleRating } from '~/utils/utils'
import { createSearchParams, Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const { PiCaretRightBold, PiCaretLeftBold, AiOutlineQuestionCircle, FaCartPlus, AiFillHeart, AiOutlineHeart } = icons

const ProductDetail = () => {
  const { t } = useTranslation('detail')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { nameId } = useParams()
  const imageRef = useRef<HTMLImageElement>(null)
  const [toggleHeart, setToggleHeart] = useState(false)
  const [indexImages, setIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const [buyCount, setBuyCount] = useState(1)

  const id = getIdFromNameId(nameId as string)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id as string),
    keepPreviousData: true
  })
  const product = data?.data.data
  const params: ProductListParams = { page: '1', limit: '13', category: product?.category._id }
  const { data: products } = useQuery({
    queryKey: ['products', params],
    queryFn: () => productApi.getProducts(params),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })
  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })

  const currentImages = useMemo(() => (product ? product.images.slice(...indexImages) : []), [indexImages, product])
  useEffect(() => {
    if (currentImages && currentImages.length > 0) {
      setActiveImage(currentImages[0])
    }
  }, [currentImages])
  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [data])

  const next = () => {
    if (product && indexImages[1] < product.images.length) setIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
  }
  const prev = () => {
    if (product && indexImages[0] > 0) setIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
  }
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    const { width, height } = e.currentTarget.getBoundingClientRect()
    const { offsetX, offsetY } = e.nativeEvent

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    const top = offsetY * (1 - naturalHeight / height)
    const left = offsetX * (1 - naturalWidth / width)
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleLeave = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleQuantity = (value: number) => {
    setBuyCount(value)
  }
  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: buyCount },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchasesStatus.INCART }]
          })
          toast.success(data.data.message, { autoClose: 1000 })
        }
      }
    )
  }
  const handleBuyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: buyCount })
    const purchase = res.data.data
    navigate(path.CART, {
      state: {
        purchase_id: purchase._id
      }
    })
  }

  if (!product) return null
  const { name, rating, price, price_before_discount, category, view, sold, quantity, description } = product

  return (
    data && (
      <div className='bg-gray'>
        <div className='container py-5'>
          <div className='flex flex-wrap items-center gap-2 pb-4 text-sm text-third'>
            <Link to={path.HOME}>Shopee Color</Link>
            <PiCaretRightBold />
            <Link
              to={{
                pathname: path.HOME,
                search: createSearchParams({
                  category: category._id
                }).toString()
              }}
            >
              {category.name}
            </Link>
            <PiCaretRightBold />
            <span className='text-grayDark'>{name}</span>
          </div>

          <div className='gap-5 mb-5 bg-white rounded-sm md:items-start md:p-4 md:flex md:gap-1'>
            <div className='flex flex-col overflow-hidden shadow-md lg:justify-between lg:basis-2/5 md:basis-21/50'>
              <div
                className='w-full lg:h-[450px] h-[330px] sm:h-[600px] shadow-md overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleLeave}
              >
                <img
                  src={activeImage}
                  alt='image'
                  className='relative object-cover w-full h-full pointer-events-none'
                  ref={imageRef}
                />
              </div>
              <div className='relative flex items-center w-full lg:h-[115px] h-[95px] flex-1 gap-2 py-3'>
                <div className='absolute left-0 px-1 py-3 cursor-pointer bg-overlay-30' onClick={prev}>
                  <PiCaretLeftBold color='white' />
                </div>
                {currentImages.map((url, index) => {
                  return (
                    <div
                      key={index}
                      className={classNames('w-full h-full border-[2px]', {
                        'border-primary': activeImage === url,
                        'border-transparent': activeImage !== url
                      })}
                      onMouseEnter={() => setActiveImage(url)}
                    >
                      <img src={url} alt={`item ${index}`} className='object-cover w-full h-full' />
                    </div>
                  )
                })}
                <div className='absolute right-0 px-1 py-3 cursor-pointer bg-overlay-30' onClick={next}>
                  <PiCaretRightBold color='white' />
                </div>
              </div>
            </div>
            <div className='p-2 sm:p-3 lg:basis-3/5 md:basis-29/50 text-secondary'>
              <h1 className='text-xl lg:text-2xl line-clamp-3'>{name}</h1>
              <div className='flex flex-col min-[412px]:flex-row min-[412px]:items-center flex-wrap gap-2 md:gap-4 py-3'>
                <div className='flex items-center'>
                  <div className='flex items-center gap-2 pr-4'>
                    <span className='border-b border-third text-third'>{rating}</span>
                    <div className='flex items-center gap-[2px]'>{handleRating(rating, 18)}</div>
                  </div>
                  <div className='flex items-center gap-2 px-4 mr-4 md:mr-0 border-x border-third'>
                    <span className='font-medium border-b border-third'>{formatNumberToSocialStyle(sold)}</span>
                    <span className='text-grayDark'>{t('detail.sold')}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-medium border-b border-third'>{formatNumberToSocialStyle(view)}</span>
                  <span className='text-grayDark'>{t('detail.view')}</span>
                </div>
              </div>
              <div className='flex flex-col gap-5 px-4 py-3 mt-2 bg-gray'>
                <div className='flex flex-wrap items-center gap-6 sm:gap-8 md:flex-col md:gap-3 md:items-start lg:flex-row lg:gap-8 lg:items-center 2xl:gap-12'>
                  <div className='flex flex-wrap items-center gap-4 sm:gap-8 2xl:gap-10'>
                    <div className='font-medium tracking-wider line-through opacity-75'>
                      ₫{formatCurrency(price_before_discount)}
                    </div>
                    <div className='text-3xl'>
                      <span className='mr-1'>₫</span>
                      <span>{formatCurrency(price)}</span>
                    </div>
                  </div>
                  <div className='px-3 py-1 text-sm text-white rounded bg-primary'>
                    <span className='mr-2'>{handleDiscount(price_before_discount, price)}%</span>
                    <span>{price_before_discount < price ? 'TĂNG' : `${t('detail.off')}`}</span>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-6 h-6'>
                    <img src={sellerImage} alt='seller-image' className='object-cover w-full h-full' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-third'>{t('detail.everything is reduced')}</span>
                      <Popover
                        className='flex flex-col bg-white rounded-sm border border-grayDark w-[470px] text-secondary p-6'
                        isFloatingArrow={false}
                        popover={
                          <>
                            <span className='text-lg'>GÌ CŨNG GIẢM</span>
                            <span className='my-3'>Đối tượng tham gia: Tất cả Người dùng</span>
                            <span className='leading-6'>
                              Nội dung chương trình: Chương trình mang đến cho Người mua những sản phẩm có giá tốt nhất
                              so với các sản phẩm cùng loại được bán trên sàn. Sản phẩm tham gia chương trình sẽ được
                              gắn nhãn "Gì Cũng Giảm" trên trang mua hàng của chúng tôi.
                            </span>
                          </>
                        }
                      >
                        <AiOutlineQuestionCircle />
                      </Popover>
                    </div>
                    <span className='text-sm'>{t('detail.best price')}</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-5 py-5 md:gap-8 md:px-4'>
                <div className='flex flex-col gap-4 md:gap-5 sm:flex-row'>
                  <span className='text-[17px] text-slate-600 shrink-0'>{t('detail.ship')}</span>
                  <div className='flex gap-3'>
                    <div className='flex-shrink-0 w-6 h-6'>
                      <img src={freeshiping} alt='free-ship' className='object-cover w-full h-full' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <span>{t('detail.free ship')}</span>
                      <span className='text-slate-500'>{t('detail.free shipping')}</span>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-3 md:gap-5 sm:flex-row sm:items-center sm:gap-8'>
                  <div className='flex flex-col items-start gap-3 md:gap-[2.4rem] sm:flex-row xl:items-center'>
                    <span className='text-[17px] shrink-0 text-slate-600'>{t('detail.quantity')}</span>
                    <div className='flex items-center gap-4 2xl:gap-5 sm:flex-col sm:items-start xl:flex-row xl:items-center'>
                      <QuantityController
                        max={quantity}
                        value={buyCount}
                        onIncrease={handleQuantity}
                        onDecrease={handleQuantity}
                        onType={handleQuantity}
                      />
                      <span className='text-sm text-slate-500'>
                        {quantity} {t('detail.pieces available')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-5 sm:flex-row'>
                  <button
                    className='flex items-center justify-center gap-3 px-10 py-3 border bg-slate-100 text-primary border-grayBox'
                    onClick={handleAddToCart}
                  >
                    <FaCartPlus size={20} />
                    {t('detail.add to cart')}
                  </button>
                  <button
                    className='py-3 text-white transition px-7 bg-primary hover:opacity-80'
                    onClick={handleBuyNow}
                  >
                    {t('detail.buy now')}
                  </button>
                </div>
                <div
                  className='flex items-center justify-center gap-3 cursor-pointer xl:justify-start w-fit'
                  onClick={() => setToggleHeart((prev) => !prev)}
                >
                  {toggleHeart ? (
                    <AiFillHeart size={24} color='#f14666' />
                  ) : (
                    <AiOutlineHeart size={24} color='#f14666' />
                  )}
                  <span>
                    {t('detail.favorite')} (
                    {toggleHeart
                      ? Number(formatNumberToSocialStyle(Number(String(sold).slice(0, 3)))) + 1
                      : Number(formatNumberToSocialStyle(Number(String(sold).slice(0, 3))))}
                    )
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='p-4 bg-white rounded-sm text-secondary'>
            <div className='p-4 mb-5 text-lg bg-gray'>{t('detail.product desc')}</div>
            <div
              className='text-sm leading-loose'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description)
              }}
            />
          </div>

          <div className='mt-5 text-secondary'>
            <h2 className='text-[20px] mb-4'>{t('detail.related products')}</h2>
            <div className='grid gap-3 xl:gap-4 min-[412px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
              {products &&
                products.data.data.products
                  .filter((product) => product._id !== data.data.data._id)
                  .map((product) => <ProductItem key={product._id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ProductDetail
