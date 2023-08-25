import * as yup from 'yup'

function handleTest(this: yup.TestContext<yup.AnyObject>) {
  const { minValue, maxValue } = this.parent as { minValue: string; maxValue: string }
  if (minValue !== '' && maxValue !== '') {
    return Number(maxValue) >= Number(minValue)
  }
  return minValue !== '' || maxValue !== ''
}

export const schema = yup
  .object({
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, 'Email không hợp lệ')
      .max(160, 'Email không được vượt quá 160 ký tự')
      .required('Email là bắt buộc'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(160, 'Mật khẩu không được vượt quá 160 ký tự')
      .required('Mật khẩu là bắt buộc'),
    cpassword: yup
      .string()
      .required('Xác nhận mật khẩu là bắt buộc')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp, hãy thử lại'),
    minValue: yup.string().test({
      name: 'price-not-allowed',
      message: 'Khoảng giá không hợp lệ',
      test: handleTest
    }),
    maxValue: yup.string().test({
      name: 'price-not-allowed',
      message: 'Khoảng giá không hợp lệ',
      test: handleTest
    })
  })
  .required()

export const registerSchema = schema.omit(['minValue', 'maxValue'])
export const loginSchema = schema.omit(['cpassword', 'minValue', 'maxValue'])
export const priceSchema = schema.pick(['minValue', 'maxValue'])

export type RegisterSchema = yup.InferType<typeof registerSchema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type PriceSchema = yup.InferType<typeof priceSchema>

export type SearchSchema = {
  searchValue: string
}
