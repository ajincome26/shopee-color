import useRoute from './useRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRoute()
  return (
    <div className='App'>
      <ToastContainer />
      {routeElements}
    </div>
  )
}

export default App
