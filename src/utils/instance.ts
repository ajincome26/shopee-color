import axios, { AxiosError, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from '~/types/auth.type'
import { clearAccessToken, getAccessToken, setAccessToken } from './auth'

let accessToken = getAccessToken()

const instance = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    const { url } = response.config
    if (url === 'register' || url === 'login') {
      accessToken = (response.data as AuthResponse).data?.access_token // Lưu vào RAM
      setAccessToken(accessToken) // Lấy từ RAM thay vì gọi getAccessToken() để lấy từ Storage
    } else if (url === 'logout') {
      ;(accessToken = ''), clearAccessToken()
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = error.response?.data
      const message = data.message || error.message
      toast.error(message)
    }
    return Promise.reject(error)
  }
)

export default instance
