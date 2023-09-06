import useQueryConfig from './useQueryConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { searchSchema, SearchSchema } from '~/utils/schema'
import { path } from '~/constants/path'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'

type FormSearch = SearchSchema

export const useSearchProduct = () => {
  const navigate = useNavigate()
  const queryParamsConfig = useQueryConfig()
  const { register, handleSubmit, reset } = useForm<FormSearch>({
    defaultValues: {
      searchValue: ''
    },
    resolver: yupResolver(searchSchema)
  })
  const handleSearch = (data: FormSearch) => {
    const config = queryParamsConfig.order
      ? omit(
          {
            ...queryParamsConfig,
            name: data.searchValue
          },
          ['order', 'sort_by']
        )
      : {
          ...queryParamsConfig,
          name: data.searchValue
        }
    navigate({
      pathname: path.HOME,
      search: createSearchParams(config).toString()
    })
  }
  return { handleSearch, register, handleSubmit, reset }
}
