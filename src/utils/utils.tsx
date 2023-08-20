import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'
import React from 'react'
import icons from './icons'

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
  const starsAmount = Math.round(+stars)
  for (let i = 1; i <= 5; i++) {
    if (starsAmount >= i) {
      starsArray.push(<AiFillStar color='#0891b2' key={i} size={size} />)
    } else {
      starsArray.push(<AiOutlineStar color='#0891b2' key={i} size={size} />)
    }
  }
  return starsArray
}
