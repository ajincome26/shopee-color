import { User } from '~/types/user.type'

export const getAccessToken = () => localStorage.getItem('accessToken') || ''
export const setAccessToken = (accessToken: string) => localStorage.setItem('accessToken', accessToken)
export const getUserInfoFromStorage = () => {
  const info = localStorage.getItem('userInfo')
  return info ? JSON.parse(info) : null
}
export const setUserInfoToStorage = (userInfo: User) => localStorage.setItem('userInfo', JSON.stringify(userInfo))

export const clearLocalStorage = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userInfo')
}
