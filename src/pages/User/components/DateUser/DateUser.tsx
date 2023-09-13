import range from 'lodash/range'
import { useState } from 'react'
import { PiCaretDownBold } from 'react-icons/pi'

interface Props {
  errorMessage?: string
  onChange?: (value: Date) => void
  value?: Date
}

const DateUser = ({ errorMessage, onChange, value }: Props) => {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0, // tháng 1
    year: value?.getFullYear() || 1990
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueSelect, name } = e.target
    const newDate = {
      day: value?.getDate() || date.day,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }
  return (
    <div>
      <div className='flex flex-col gap-2 lg:gap-5 lg:items-center lg:flex-row'>
        <span className='font-semibold lg:font-medium lg:text-right lg:w-1/5'>Ngày sinh</span>
        <div className='grid grid-cols-3 gap-4 lg:w-4/5'>
          <div className='relative group'>
            <select
              className='flex items-center justify-between w-full h-10 px-4 py-2 border outline-none cursor-pointer border-grayBox group-hover:border-primary'
              value={value?.getDate() || date.day}
              name='day'
              onChange={handleChange}
            >
              {range(1, 32).map((item) => (
                <option key={item} value={item} className='bg-white text-secondary'>
                  {item}
                </option>
              ))}
            </select>
            <div className='absolute top-1/2 right-[14px] translate-y-[-50%] cursor-pointer group-hover:border-primary'>
              <PiCaretDownBold color='#0891b2' />
            </div>
          </div>
          <div className='relative group'>
            <select
              className='flex items-center justify-between w-full h-10 px-4 py-2 border outline-none cursor-pointer border-grayBox group-hover:border-primary'
              value={value?.getMonth() || date.month}
              name='month'
              onChange={handleChange}
            >
              {range(0, 12).map((item) => (
                <option key={item} value={item} className='bg-white text-secondary'>
                  {item + 1}
                </option>
              ))}
            </select>
            <div className='absolute top-1/2 right-[14px] translate-y-[-50%] cursor-pointer group-hover:border-primary'>
              <PiCaretDownBold color='#0891b2' />
            </div>
          </div>
          <div className='relative group'>
            <select
              className='flex items-center justify-between w-full h-10 px-4 py-2 border outline-none cursor-pointer border-grayBox group-hover:border-primary'
              value={value?.getFullYear() || date.year}
              name='year'
              onChange={handleChange}
            >
              {range(1990, 2024).map((item) => (
                <option key={item} value={item} className='bg-white text-secondary'>
                  {item}
                </option>
              ))}
            </select>
            <div className='absolute top-1/2 right-[14px] translate-y-[-50%] cursor-pointer group-hover:border-primary'>
              <PiCaretDownBold color='#0891b2' />
            </div>
          </div>
        </div>
      </div>
      <div className='text-sm text-red-500 min-h-[1rem] leading-4'>{errorMessage}</div>
    </div>
  )
}

export default DateUser
