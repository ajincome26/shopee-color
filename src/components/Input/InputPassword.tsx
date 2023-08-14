import { useState } from 'react'
import Input from './Input'
import { icons } from '~/utils'
import { UseFormRegister } from 'react-hook-form'
import { FormRegister } from '~/types/formRegister.type'

const { AiOutlineEye, AiOutlineEyeInvisible } = icons

interface Props {
  type?: React.HTMLInputTypeAttribute
  name: string
  placeholder: string
  register: UseFormRegister<FormRegister>
}

const InputPassword = ({ name, ...props }: Props) => {
  const [togglePassword, setTogglePassword] = useState(false)
  return (
    <Input name={name} type={togglePassword ? 'text' : 'password'} {...props}>
      {togglePassword ? (
        <AiOutlineEyeInvisible onClick={() => setTogglePassword((prev) => !prev)} />
      ) : (
        <AiOutlineEye onClick={() => setTogglePassword((prev) => !prev)} />
      )}
    </Input>
  )
}

export default InputPassword
