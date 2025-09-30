import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.mount('#app')
