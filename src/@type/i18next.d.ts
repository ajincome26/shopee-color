import 'i18next'
import { resources, defaultNS } from '~/i18n/i18n'

declare module 'i18next' {
  // kế thừa (thêm vào type)
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['en'] // nên kế thừa ngôn ngữ mặc định
  }
}
