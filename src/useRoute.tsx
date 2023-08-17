import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { CartLayout } from './layouts/CartLayout'
import { MainLayout } from './layouts/MainLayout'
import { RegisterLayout } from './layouts/RegisterLayout'
import { UserLayout } from './layouts/UserLayout'
import { LoginPage } from './pages/LoginPage'
import { ProductList } from './pages/ProductList'
import { Profile } from './pages/Profile'
import { RegisterPage } from './pages/RegisterPage'

const isLoggedIn = false

export function ProtectedRoute() {
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export function RejectedRouteLogin() {
  return !isLoggedIn ? <Outlet /> : <Navigate to='/' />
}

const useRoute = () => {
  const element = useRoutes([
    {
      // Nếu ProtectedRoute là cha của MainLayout và ProductList (path: '/') thì khi 'isLoggedIn = false', nó sẽ to='/login' tìm và thấy không có thằng nào match với to='/'. => Lỗi
      element: <MainLayout />,
      children: [{ index: true, path: '/', element: <ProductList /> }]
    },
    {
      element: <RejectedRouteLogin />,
      children: [
        {
          // Muốn vào được đây thì phải chưa đăng nhập, không sẽ trở về Home
          element: <RegisterLayout />,
          children: [
            {
              path: '/register',
              element: <RegisterPage />
            },
            {
              path: '/login',
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
                  path: '/user/profile',
                  element: <Profile />
                }
              ]
            }
          ]
        },
        {
          path: '/cart',
          element: <CartLayout />
        }
      ]
    }
  ])
  return element
}

// eslint-disable-next-line react-refresh/only-export-components
export default useRoute
