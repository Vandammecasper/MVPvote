
import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './bootstrap/router'

const app = createApp(App)

;(async () => {
    // await restoreUser()
  
    app.use(router)
    app.mount('#app')
  })()
