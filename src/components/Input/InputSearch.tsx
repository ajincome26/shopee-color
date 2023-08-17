import { InputHTMLAttributes } from 'react'
import type { FieldValues, FieldPath, UseFormRegister } from 'react-hook-form'

export interface InputProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  name: FieldPath<TFieldValues>
  register: UseFormRegister<TFieldValues>
}

const InputSearch = <TFieldValues extends FieldValues = FieldValues>({
  name,
  register,
  placeholder
}: InputProps<TFieldValues>) => {
  return (
    <input
      id={name}
      type='text'
      placeholder={placeholder}
      {...register(name)}
      className='w-full px-4 py-3 transition border border-transparent rounded-md bg-grayField hover:border-white focus:border-white focus:bg-white text-grayDark placeholder:uppercase placeholder:text-sm'
      autoComplete='on'
    />
  )
}

export default InputSearch
