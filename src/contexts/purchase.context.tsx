import React, { createContext, useContext, useState } from 'react'
import { ExtendedPurchase } from '~/types/purchase.type'

interface PurchaseProviderType {
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  resetPurchase: () => void
}
const initialContext: PurchaseProviderType = {
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  resetPurchase: () => null
}

const PurchaseContext = createContext<PurchaseProviderType>(initialContext)
const usePurchase = () => {
  const context = useContext(PurchaseContext)
  if (typeof context === 'undefined') throw new Error('usePurchase must be used within a PurchaseContext')
  return context
}
const PurchaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchase, setExtendedPurchase] = useState(initialContext.extendedPurchase)
  const resetPurchase = () => {
    setExtendedPurchase([])
  }
  return (
    <PurchaseContext.Provider value={{ extendedPurchase, setExtendedPurchase, resetPurchase }}>
      {children}
    </PurchaseContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { usePurchase, PurchaseProvider }
