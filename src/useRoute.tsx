import { useRoutes } from 'react-router-dom'
import { RegisterLayout } from './layouts/RegisterLayout'
import { LoginPage } from './pages/LoginPage'
import { ProductList } from './pages/ProductList'
import { RegisterPage } from './pages/RegisterPage'

const useRoute = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      element: <RegisterLayout />,
      children: [
        {
          path: '/register',
          element: <RegisterPage />
        }
      ]
    },
    {
      element: <RegisterLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />
        }
      ]
    }
  ])
  return element
}

export default useRoute
