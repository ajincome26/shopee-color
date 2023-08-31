import { UserLayout } from './layouts/UserLayout'
import { useAuth } from './contexts/auth.context'
import { RegisterPage } from './pages/RegisterPage'
import { RegisterLayout } from './layouts/RegisterLayout'
import { Profile } from './pages/Profile'
import { ProductList } from './pages/ProductList'
import { path } from './constants/path'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'

const { HOME, LOGIN, REGISTER, PROFILE, CART, PRODUCT_DETAIL } = path

const useRoute = () => {
  const { isLoggedIn } = useAuth()

  function ProtectedRoute() {
    return isLoggedIn ? <Outlet /> : <Navigate to={LOGIN} />
  }
  function RejectedRoute() {
    return !isLoggedIn ? <Outlet /> : <Navigate to={HOME} />
  }

  const element = useRoutes([
    {
      element: <RejectedRoute />,
      children: [
        {
          // Muốn vào được đây thì phải chưa đăng nhập, không sẽ trở về Home
          element: <RegisterLayout />,
          children: [
            {
              path: REGISTER,
              element: <RegisterPage />
            },
            {
              path: LOGIN,
              element: <LoginPage />
            }
          ]
        }
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          // Muốn vào được đây thì phải đăng nhập rồi, không sẽ trở về Login
          element: <MainLayout />,
          children: [
            {
              path: CART,
              element: <Cart />
            },
            {
              element: <UserLayout />,
              children: [
                {
                  path: PROFILE,
                  element: <Profile />
                }
              ]
            }
          ]
        }
      ]
    },
    // Authen không ảnh hưởng
    {
      element: <MainLayout />,
      children: [
        { index: true, path: HOME, element: <ProductList /> },
        { path: PRODUCT_DETAIL, element: <ProductDetail /> }
      ]
    }
  ])
  return element
}

// Nếu ProtectedRoute là cha của MainLayout và ProductList (path: '/') thì khi 'isLoggedIn = false', nó sẽ to='/login' tìm và thấy không có thằng nào match với to='/'. => Lỗi
export default useRoute
