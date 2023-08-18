import React, { createContext, useContext, useState } from 'react'
import { getAccessToken } from '~/utils/auth'

interface AuthProviderType {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
const initialContext: AuthProviderType = {
  isLoggedIn: Boolean(getAccessToken()),
  setIsLoggedIn: () => null
}

const AuthContext = createContext<AuthProviderType>(initialContext)
const useAuth = () => {
  const context = useContext(AuthContext)
  if (typeof context === 'undefined') throw new Error('useAuth must be used within a AuthContext')
  return context
}
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn)
  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider }
