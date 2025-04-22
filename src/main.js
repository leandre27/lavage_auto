import './assets/main.css'

import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

import fr from './locales/fr.json'
import en from './locales/en.json'

const app = createSSRApp(App)
const i18n = createI18n({
    locale: 'fr', // langue par défaut
    fallbackLocale: 'en',
    messages: {
        fr,
        en
      },
  })

app.use(router)
app.use(i18n)
app.mount('#app')
