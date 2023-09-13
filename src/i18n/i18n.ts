import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '../locales/en/home.json'
import HOME_VI from '../locales/vi/home.json'
import CART_EN from '../locales/en/cart.json'
import CART_VI from '../locales/vi/cart.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    cart: CART_EN
  },
  vi: {
    home: HOME_VI,
    cart: CART_VI
  }
} as const

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home, cart'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
