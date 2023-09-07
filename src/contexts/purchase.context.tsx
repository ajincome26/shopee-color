import React, { createContext, useContext, useState } from 'react'
import { ExtendedPurchase } from '~/types/purchase.type'

interface PurchaseProviderType {
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}
const initialContext: PurchaseProviderType = {
  extendedPurchase: [],
  setExtendedPurchase: () => null
}

const PurchaseContext = createContext<PurchaseProviderType>(initialContext)
const usePurchase = () => {
  const context = useContext(PurchaseContext)
  if (typeof context === 'undefined') throw new Error('usePurchase must be used within a PurchaseContext')
  return context
}
const PurchaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendedPurchase, setExtendedPurchase] = useState(initialContext.extendedPurchase)
  return (
    <PurchaseContext.Provider value={{ extendedPurchase, setExtendedPurchase }}>{children}</PurchaseContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { usePurchase, PurchaseProvider }
