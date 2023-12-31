import { UserLayout } from './pages/User/layout/UserLayout'
import { useAuth } from './contexts/auth.context'
import { RegisterLayout } from './layouts/RegisterLayout'
import { path } from './constants/path'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { lazy, Suspense } from 'react'
import { CartLayout } from './layouts/CartLayout'

export const LoginPage = lazy(async () => ({ default: (await import('./pages/LoginPage')).LoginPage }))
export const RegisterPage = lazy(async () => ({ default: (await import('./pages/RegisterPage')).RegisterPage }))
export const Cart = lazy(async () => ({ default: (await import('./pages/Cart')).Cart }))
export const Profile = lazy(async () => ({ default: (await import('./pages/User/pages/Profile')).Profile }))
export const ChangePassword = lazy(async () => ({
  default: (await import('./pages/User/pages/ChangePassword')).ChangePassword
}))
export const Purchase = lazy(async () => ({
  default: (await import('./pages/User/pages/Purchase')).Purchase
}))
export const ProductList = lazy(async () => ({ default: (await import('./pages/ProductList')).ProductList }))
export const ProductDetail = lazy(async () => ({ default: (await import('./pages/ProductDetail')).ProductDetail }))
export const NotFound = lazy(async () => ({ default: (await import('./pages/NotFound')).NotFound }))

const { HOME, LOGIN, REGISTER, PROFILE, CART, PRODUCT_DETAIL, CHANGE_PASSWORD, PURCHASE, NOT_FOUND } = path

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
              element: (
                <Suspense>
                  <RegisterPage />
                </Suspense>
              )
            },
            {
              path: LOGIN,
              element: (
                <Suspense>
                  <LoginPage />
                </Suspense>
              )
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
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: CHANGE_PASSWORD,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: PURCHASE,
                  element: (
                    <Suspense>
                      <Purchase />
                    </Suspense>
                  )
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
              element: (
                <Suspense>
                  <Cart />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    // Authen không ảnh hưởng
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: HOME,
          element: (
            <Suspense>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: PRODUCT_DETAIL,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        }
      ]
    },
    {
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      ),
      path: NOT_FOUND
    }
  ])
  return element
}

// Nếu ProtectedRoute là cha của MainLayout và ProductList (path: '/') thì khi 'isLoggedIn = false', nó sẽ to='/login' tìm và thấy không có thằng nào match với to='/'. => Lỗi
// eslint-disable-next-line react-refresh/only-export-components
export default useRoute
