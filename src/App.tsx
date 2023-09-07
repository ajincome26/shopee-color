import useRoute from './useRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './contexts/auth.context'
import { usePurchase } from './contexts/purchase.context'
import { LocalStorageEventTarget } from './utils/auth'
import { useEffect } from 'react'

function App() {
  const routeElements = useRoute()
  const { resetAuth } = useAuth()
  const { resetPurchase } = usePurchase()
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      resetAuth(), resetPurchase()
    })
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', () => {
        resetAuth(), resetPurchase()
      })
    }
  }, [resetAuth, resetPurchase])
  return (
    <div className='App'>
      <ToastContainer />
      {routeElements}
    </div>
  )
}

export default App
