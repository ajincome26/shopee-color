import { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputNumber = forwardRef<HTMLInputElement, InputProps>(function InputNumberInner(
  { className, onChange, ...rest },
  ref
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) onChange(e)
  }

  return (
    <input
      {...rest}
      className={`${className} w-full transition border border-transparent rounded-md placeholder:text-sm`}
      autoComplete='on'
      onChange={handleChange}
      ref={ref}
    />
  )
})

export default InputNumber
