import axios, { AxiosError, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

const instance = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
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
