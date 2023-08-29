import icons from '~/utils/icons'
import classNames from 'classnames'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { priceSchema, PriceSchema } from '~/utils/schema'
import { path } from '~/constants/path'
import { omit } from 'lodash'
import { ObjectSchema } from 'yup'
import { NoUndefinedField } from '~/utils/utils'
import { InputNumber } from '~/components/Input'
import { FilterRating } from '../FilterRating'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { Category } from '~/types/category.type'
import { Button } from '~/components/Button'
import { QueryParamsConfig } from '~/hooks/useQueryConfig'

const { BsListUl, LiaFilterSolid, AiFillCaretRight } = icons

export type FormValues = NoUndefinedField<PriceSchema>
interface Props {
  className?: string
  queryParamsConfig: QueryParamsConfig
  categories: Category[]
}

const FilterPanel = ({ className, queryParamsConfig, categories }: Props) => {
  const navigate = useNavigate()
  const { category, price_max, price_min } = queryParamsConfig
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(priceSchema as ObjectSchema<FormValues>),
    shouldFocusError: false,
    defaultValues: {
      minValue: '',
      maxValue: ''
    }
  })

  const handleFilterPrice = (data: FormValues) => {
    navigate({
      pathname: path.HOME,
      search: createSearchParams({
        ...queryParamsConfig,
        price_min: data.minValue,
        price_max: data.maxValue
      }).toString()
    })
  }

  const handleRemoveAll = () => {
    navigate({
      pathname: path.HOME,
      search: createSearchParams(
        omit(
          {
            ...queryParamsConfig
          },
          ['category', 'price_min', 'price_max', 'rating_filter']
        )
      ).toString()
    })
  }

  useEffect(() => {
    if (!(price_max && price_min)) {
      reset({
        minValue: '',
        maxValue: ''
      })
    }
  }, [price_max, price_min, reset])

  return (
    <div className={`${className} text-secondary`}>
      <Link
        to='/'
        className={classNames('flex items-center gap-4 pt-8 pb-4 font-semibold border-b md:mt-2 border-b-grayBox', {
          'text-third': !category,
          'text-secondary': category
        })}
      >
        <BsListUl />
        <h2>Tất cả danh mục</h2>
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        {categories.map((item) => (
          <Link
            key={item._id}
            to={{
              pathname: path.HOME,
              search: createSearchParams({
                ...queryParamsConfig,
                category: item._id
              }).toString()
            }}
            className={classNames('relative flex items-center gap-2 hover:opacity-80 transition', {
              'text-third font-semibold': category === item._id,
              'text-secondary font-medium': category !== item._id
            })}
          >
            {category === item._id && <AiFillCaretRight className='absolute -left-5' />}
            {item.name}
          </Link>
        ))}
      </div>

      <Link
        to='/'
        className={classNames('flex items-center gap-3 pb-4 mt-3 font-semibold border-b border-b-grayBox', {
          'text-third': price_max || price_min,
          'text-secondary': !(price_max && price_min)
        })}
      >
        <LiaFilterSolid />
        <h2>Bộ lọc tìm kiếm</h2>
      </Link>
      <div className='flex flex-col gap-3 py-4 border-b md:px-4 border-b-grayBox'>
        <h3>Khoảng giá</h3>
        <form onSubmit={handleSubmit(handleFilterPrice)}>
          <div className='flex items-center gap-3'>
            <Controller
              control={control}
              name='minValue'
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <InputNumber
                    className='px-2 py-1 text-sm bg-white placeholder:normal-case focus:border-secondary focus:border'
                    placeholder='₫ Từ'
                    onChange={(e) => {
                      onChange(e)
                      trigger('maxValue')
                    }}
                    value={value}
                    ref={ref}
                  />
                )
              }}
            />
            <div className='text-secondary'>-</div>
            <Controller
              control={control}
              name='maxValue'
              render={({ field: { onChange, value, ref } }) => {
                return (
                  <InputNumber
                    className='px-2 py-1 text-sm bg-white placeholder:normal-case focus:border-secondary focus:border'
                    placeholder='₫ Đến'
                    onChange={(e) => {
                      onChange(e)
                      trigger('minValue')
                    }}
                    value={value}
                    ref={ref}
                  />
                )
              }}
            />
          </div>
          <div className='h-5 mt-1 text-sm text-red-500'>{errors.minValue?.message}</div>
          <Button type='submit' className='w-full py-2 mt-1 text-sm uppercase'>
            Áp dụng
          </Button>
        </form>
      </div>

      <FilterRating queryParamsConfig={queryParamsConfig} />

      <div className='md:px-4' onClick={handleRemoveAll}>
        <Button className='w-full py-2 my-4 text-sm uppercase'>Xóa tất cả</Button>
      </div>
    </div>
  )
}

export default FilterPanel
