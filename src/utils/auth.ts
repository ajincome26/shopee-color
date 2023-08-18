export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || ''
}
export const setAccessToken = (accessToken: string) => {
  return localStorage.setItem('accessToken', accessToken)
}
export const clearAccessToken = () => {
  return localStorage.removeItem('accessToken')
}
