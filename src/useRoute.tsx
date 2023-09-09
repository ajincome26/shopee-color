import { UserLayout } from './pages/User/layout/UserLayout'
import { useAuth } from './contexts/auth.context'
import { RegisterPage } from './pages/RegisterPage'
import { RegisterLayout } from './layouts/RegisterLayout'
import { Purchase } from './pages/User/pages/Purchase'
import { Profile } from './pages/User/pages/Profile'
import { ProductList } from './pages/ProductList'
import { ProductDetail } from './pages/ProductDetail'
import { path } from './constants/path'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'
import { ChangePassword } from './pages/User/pages/ChangePassword'
import { CartLayout } from './layouts/CartLayout'
import { Cart } from './pages/Cart'

const { HOME, LOGIN, REGISTER, PROFILE, CART, PRODUCT_DETAIL, CHANGE_PASSWORD, PURCHASE } = path

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Outlet /> : <Navigate to={LOGIN} />
}
// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
  const { isLoggedIn } = useAuth()
  return !isLoggedIn ? <Outlet /> : <Navigate to={HOME} />
}

const useRoute = () => {
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
              element: <UserLayout />,
              children: [
                {
                  path: PROFILE,
                  element: <Profile />
                },
                {
                  path: CHANGE_PASSWORD,
                  element: <ChangePassword />
                },
                {
                  path: PURCHASE,
                  element: <Purchase />
                }
              ]
            }
          ]
        },
        {
          element: <CartLayout />,
          children: [
            {
              path: CART,
              element: <Cart />
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
