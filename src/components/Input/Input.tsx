import { InputHTMLAttributes } from 'react'
import { FieldValues, FieldPath, UseFormRegister } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types'
import { FormRegister } from '~/types/formRegister.type'
interface Props {
  type?: React.HTMLInputTypeAttribute
  placeholder: string
  name: string
  rules?: RegisterOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  children?: JSX.Element | JSX.Element[]
}

const Input = ({ type, name, rules, register, children, ...props }: Props) => {
  return (
    <div className='relative w-full'>
      <input
        id={name}
        type={type || 'text'}
        {...register(name, rules)}
        {...props}
        className={`mb-[6px] border border-transparent rounded-lg py-3 bg-grayField hover:border-primary focus:border-primary transition w-full focus:bg-white ${
          children ? 'pl-4 pr-10' : 'px-4'
        }`}
      />
      <span className='absolute top-1/2 right-3 translate-y-[-50%] cursor-pointer text-grayDark'>{children}</span>
    </div>
  )
}

export default Input
