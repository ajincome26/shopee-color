import { InputHTMLAttributes } from 'react'
import type { FieldValues, FieldPath, UseFormRegister } from 'react-hook-form'

export interface InputProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute
  placeholder: string
  name: FieldPath<TFieldValues>
  children?: React.ReactNode
  errorMessage?: string
  register: UseFormRegister<TFieldValues>
}

const Input = <TFieldValues extends FieldValues = FieldValues>({
  type,
  name,
  children,
  errorMessage,
  register,
  ...props
}: InputProps<TFieldValues>) => {
  return (
    <div className='relative w-full'>
      <input
        id={name}
        type={type || 'text'}
        {...register(name)}
        {...props}
        className={`mb-[6px] border border-transparent rounded-lg py-3 bg-grayField hover:border-primary focus:border-primary transition w-full focus:bg-white ${
          children ? 'pl-4 pr-10' : 'px-4'
        }`}
        autoComplete='on'
      />
      <span className='absolute top-1/2 right-3 translate-y-[-110%] cursor-pointer text-grayDark'>{children}</span>
      <div className='text-sm text-red-500 min-h-[1rem] leading-4'>{errorMessage}</div>
    </div>
  )
}

export default Input
