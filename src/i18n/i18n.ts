import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '../locales/en/home.json'
import HOME_VI from '../locales/vi/home.json'
import CART_EN from '../locales/en/cart.json'
import CART_VI from '../locales/vi/cart.json'
import DETAIL_EN from '../locales/en/detail.json'
import DETAIL_VI from '../locales/vi/detail.json'
import USER_EN from '../locales/en/user.json'
import USER_VI from '../locales/vi/user.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    cart: CART_EN,
    detail: DETAIL_EN,
    user: USER_EN
  },
  vi: {
    home: HOME_VI,
    cart: CART_VI,
    detail: DETAIL_VI,
    user: USER_VI
  }
} as const

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'cart', 'detail', 'user'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
