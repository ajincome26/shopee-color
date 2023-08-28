import { useQuery } from '@tanstack/react-query'
import { createSearchParams, Link, useParams } from 'react-router-dom'
import productApi from '~/apis/product.api'
import { Popover } from '~/components/Popover'
import icons from '~/utils/icons'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, handleDiscount, handleRating } from '~/utils/utils'
import sellerImage from '../../assets/hot-price-100.png'
import freeshiping from '../../assets/free-shipping-64.png'
import { useEffect, useMemo, useRef, useState } from 'react'
import { path } from '~/constants/path'
import DOMPurify from 'dompurify'
import classNames from 'classnames'
import { ProductItem } from '../ProductList/components/ProductItem'

const {
  PiCaretRightBold,
  PiCaretLeftBold,
  AiOutlineQuestionCircle,
  BiPlus,
  RiSubtractLine,
  FaCartPlus,
  AiFillHeart,
  AiOutlineHeart
} = icons

const ProductDetail = () => {
  const imageRef = useRef<HTMLImageElement>(null)
  const { nameId } = useParams()
  const [toggleHeart, setToggleHeart] = useState(false)
  const [indexImages, setIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  const id = getIdFromNameId(nameId as string)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id as string),
    keepPreviousData: true
  })
  const { data: products } = useQuery({
    queryKey: ['productsCategory', data?.data.data.category._id],
    queryFn: () => productApi.getProductsWithCategory(data?.data.data.category._id as string),
    keepPreviousData: true
  })
  const currentImages = useMemo(() => (data ? data.data.data.images.slice(...indexImages) : []), [data, indexImages])
  useEffect(() => {
    if (currentImages && currentImages.length > 0) {
      setActiveImage(currentImages[0])
    }
  }, [currentImages])
  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [data])

  const next = () => {
    if (data && indexImages[1] < data.data.data.images.length) setIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
  }
  const prev = () => {
    if (data && indexImages[0] > 0) setIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
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
  if (!data) return null
  const { name, rating, price, price_before_discount, category, view, sold, quantity, description } = data.data.data

  return (
    data && (
      <div className='bg-gray'>
        <div className='container py-5'>
          <div className='flex items-center gap-2 pb-4 text-sm text-third'>
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

          <div className='flex gap-5 p-4 mb-5 bg-white rounded-sm'>
            <div className='flex flex-col justify-between overflow-hidden shadow-md basis-2/5'>
              <div
                className='w-full h-[450px] shadow-md overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleLeave}
              >
                <img
                  src={activeImage}
                  alt='image'
                  className='relative object-contain w-full h-full pointer-events-none'
                  ref={imageRef}
                />
              </div>
              <div className='relative flex items-center w-full h-[115px] gap-2 py-3'>
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
            <div className='p-3 basis-3/5 text-secondary'>
              <h1 className='text-2xl line-clamp-3'>{name}</h1>
              <div className='flex items-center py-3'>
                <div className='flex items-center gap-2 pr-4'>
                  <span className='border-b border-third text-third'>{rating}</span>
                  <div className='flex items-center gap-[2px]'>{handleRating(rating, 18)}</div>
                </div>
                <div className='flex items-center gap-2 px-4 border-x border-third'>
                  <span className='font-medium border-b border-third'>{formatNumberToSocialStyle(sold)}</span>
                  <span className='text-grayDark'>Đã bán</span>
                </div>
                <div className='flex items-center gap-2 px-4'>
                  <span className='font-medium border-b border-third'>{formatNumberToSocialStyle(view)}</span>
                  <span className='text-grayDark'>Lượt xem</span>
                </div>
              </div>
              <div className='flex flex-col gap-5 px-4 py-3 mt-2 bg-gray'>
                <div className='flex items-center gap-8'>
                  <div className='font-medium tracking-wider line-through opacity-75'>
                    ₫{formatCurrency(price_before_discount)}
                  </div>
                  <div className='text-3xl'>
                    <span className='mr-1'>₫</span>
                    <span>{formatCurrency(price)}</span>
                  </div>
                  <div className='px-3 py-1 text-sm text-white rounded bg-primary'>
                    <span className='mr-2'>{handleDiscount(price_before_discount, price)}%</span>
                    <span>{price_before_discount < price ? 'TĂNG' : 'GIẢM'}</span>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-6 h-6'>
                    <img src={sellerImage} alt='seller-image' className='object-cover w-full h-full' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-third'>Gì cũng giảm</span>
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
                    <span className='text-sm'>Giá tốt nhất so với các sản phẩm cùng loại</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-8 px-4 py-5'>
                <div className='flex gap-5'>
                  <span className='text-[17px] text-slate-600'>Vận chuyển</span>
                  <div className='flex gap-3'>
                    <div className='w-6 h-6'>
                      <img src={freeshiping} alt='free-ship' className='object-cover w-full h-full' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <span>Miễn phí vận chuyển</span>
                      <span className='text-slate-500'>Miễn phí vận chuyển cho đơn hàng từ ₫50.000</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-[2.4rem]'>
                  <span className='text-[17px] text-slate-600'>Số lượng</span>
                  <div className='flex items-center gap-5'>
                    <div className='flex items-center border border-grayBox'>
                      <button className='h-full px-3 py-2 transition hover:bg-gray'>
                        <RiSubtractLine />
                      </button>
                      <div className='px-6 py-2 leading-4 border-x border-grayBox'>1</div>
                      <button className='px-3 py-2 transition hover:bg-gray'>
                        <BiPlus />
                      </button>
                    </div>
                    <span className='text-sm text-slate-500'>{quantity} sản phẩm có sẵn</span>
                  </div>
                </div>
                <div className='flex gap-5'>
                  <button className='flex items-center gap-3 px-10 py-3 border bg-slate-100 text-primary border-grayBox'>
                    <FaCartPlus size={20} />
                    Thêm vào giỏ hàng
                  </button>
                  <button className='py-3 text-white transition px-7 bg-primary hover:opacity-80'>Mua ngay</button>
                </div>
                <div className='flex items-center gap-3 cursor-pointer' onClick={() => setToggleHeart((prev) => !prev)}>
                  {toggleHeart ? (
                    <AiFillHeart size={24} color='#f14666' />
                  ) : (
                    <AiOutlineHeart size={24} color='#f14666' />
                  )}
                  <span>
                    Đã thích (
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
            <div className='p-4 mb-5 text-lg bg-gray'>Mô tả sản phẩm</div>
            <div
              className='text-sm leading-loose'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description)
              }}
            />
          </div>

          <div className='mt-5 text-secondary'>
            <h2 className='text-[20px] mb-4'>Sản phẩm liên quan</h2>
            <div className='grid grid-cols-6 gap-3'>
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
