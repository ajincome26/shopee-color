import { AxiosError, HttpStatusCode, isAxiosError } from 'axios'

// export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
// export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
//   return axios.isAxiosError(error)
// }

export function isAxiosUnprocessableEntityError<TFormError>(error: unknown): error is AxiosError<TFormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
