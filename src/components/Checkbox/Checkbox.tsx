import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'
import { BsCheck } from 'react-icons/bs'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ checked, children, ...rest }: Props) => {
  return (
    <label>
      <input id='checkbox' type='checkbox' className='hidden' {...rest} />
      <div className='flex items-center gap-x-2'>
        <div
          className={classNames(
            'flex items-center justify-center w-5 h-5 transition-all duration-200 ease-linear border rounded-md cursor-pointer border-primary',
            {
              'bg-primary': checked,
              'bg-white': !checked
            }
          )}
        >
          {checked && <BsCheck color='white' size={20} />}
        </div>
        {children ? (
          <label htmlFor='checkbox' className='ml-3 cursor-pointer'>
            {children}
          </label>
        ) : null}
      </div>
    </label>
  )
}

export default Checkbox
