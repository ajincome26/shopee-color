import { BiPlus } from 'react-icons/bi'
import { RiSubtractLine } from 'react-icons/ri'
import { InputNumber } from '../Input'

interface Props {
  value: number
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
}

const QuantityController = ({ value = 1, max, onIncrease, onDecrease, onType, ...rest }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max && _value > max) _value = max
    else if (_value < 1) _value = 1
    onType && onType(_value)
  }
  const handleIncrease = () => {
    let _value = value + 1
    if (max && _value > max) _value = max
    onIncrease && onIncrease(_value)
  }
  const handleDecrease = () => {
    let _value = value - 1
    if (_value < 1) _value = 1
    onDecrease && onDecrease(_value)
  }
  return (
    <div className='flex items-center border border-grayBox'>
      <button className='h-8 px-3 py-2 transition border-r hover:bg-gray border-grayBox' onClick={handleDecrease}>
        <RiSubtractLine />
      </button>
      <InputNumber
        className='w-16 h-8 text-center rounded-none focus:border-primary'
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <button className='h-8 px-3 py-2 transition border-l hover:bg-gray border-grayBox' onClick={handleIncrease}>
        <BiPlus />
      </button>
    </div>
  )
}

export default QuantityController
