/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createApp } from 'vue'
import store from './store'
import descope from '@descope/vue-sdk'
import { createI18n, useI18n } from 'vue-i18n'
import en from './locale/en'
import zh from './locale/zh'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language, // Set the locale based on the user's browser language
  fallbackLocale: 'en', // Set a fallback locale in case the browser language is not available
  messages: {
    'zh-TW':zh,
    'zh-HK':zh,
    'zh-CN':zh,
    en,

  },
})
const app = createApp(App)

loadFonts()
app.use(vuetify)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
