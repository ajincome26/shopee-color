import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useAuth } from './contexts/auth.context'
import { CartLayout } from './layouts/CartLayout'
import { MainLayout } from './layouts/MainLayout'
import { RegisterLayout } from './layouts/RegisterLayout'
import { UserLayout } from './layouts/UserLayout'
import { LoginPage } from './pages/LoginPage'
import { ProductList } from './pages/ProductList'
import { Profile } from './pages/Profile'
import { RegisterPage } from './pages/RegisterPage'

const useRoute = () => {
  const { isLoggedIn } = useAuth()

  function ProtectedRoute() {
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
  }
  function RejectedRoute() {
    return !isLoggedIn ? <Outlet /> : <Navigate to='/' />
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
    },
    {
      // Nếu ProtectedRoute là cha của MainLayout và ProductList (path: '/') thì khi 'isLoggedIn = false', nó sẽ to='/login' tìm và thấy không có thằng nào match với to='/'. => Lỗi
      element: <MainLayout />,
      children: [{ index: true, path: '/', element: <ProductList /> }]
    }
  ])
  return element
}

export default useRoute
