import useRoute from './useRoute'

function App() {
  const routeElements = useRoute()
  return <div className='App'>{routeElements}</div>
}

export default App
