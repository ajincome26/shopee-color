import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth.context'
import './styles/index.scss'
import { PurchaseProvider } from './contexts/purchase.context'
import { ErrorBoundary } from './components/ErrorBoundary'
import './i18n/i18n'
import { HelmetProvider } from 'react-helmet-async'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PurchaseProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </PurchaseProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
