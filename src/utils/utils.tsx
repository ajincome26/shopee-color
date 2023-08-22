import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import React from 'react'
import icons from './icons'
import { v1 } from 'uuid'

const { AiOutlineStar, AiFillStar } = icons

// export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
// export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
//   return axios.isAxiosError(error)
// }
export function isAxiosUnprocessableEntityError<TFormError>(error: unknown): error is AxiosError<TFormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const handleStar = (stars: number | string, size?: number) => {
  const starsArray: React.ReactNode[] = []
  const starsAmount = +stars
  for (let i = 1; i <= 5; i++) {
    if (starsAmount >= i) {
      starsArray.push(<AiFillStar color='#0891b2' key={i} size={size || 16} />)
    } else {
      starsArray.push(<AiOutlineStar color='#0891b2' key={i} size={size || 16} />)
    }
  }
  return starsArray
}
export const handleStarProduct = (stars: number | string, size?: number) => {
  const starsArray: React.ReactNode[] = []
  const starsAmount = Math.floor(+stars)
  for (let i = 1; i <= 5; i++) {
    if (starsAmount >= i) {
      starsArray.push(<AiFillStar color='#0891b2' key={i} size={size || 16} />)
    } else {
      starsArray.push(
        <div className='relative' key={i}>
          <div className='relative z-10 w-1/2 overflow-hidden'>
            <AiFillStar color='#0891b2' size={size || 16} />
          </div>
          <div className='absolute top-0 right-0'>
            <AiOutlineStar color='#d3d6d6' size={size || 16} />
          </div>
        </div>
      )
    }
  }
  starsArray.fill(<AiOutlineStar color='#d3d6d6' key={v1()} size={size || 16} />, starsAmount + 1)
  return starsArray
}

export const handleDotPrice = (price: number) => {
  if (price > 9999 && price < 1000000) {
    return `${Math.floor(price / 1000)}.${price % 1000 === 0 ? '000' : price % 1000}`
  }
  // else if (price >= 100000 && price < 999999) {
  //   return `${Math.floor(price/100000)}`
  // }
  return price
}

export const handleSold = (sold: number) => {
  if (sold > 999 && sold < 1000000) {
    // return `${sold/1000}.${sold%1000 === 0 ? 'k' : Math.round(sold%1000)}`
  }
}

export const handleDiscount = (beforePrice: number, price: number) => {
  const percent = ((beforePrice - price) / price) * 100
  return Math.round(percent)
}
