import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'



let app = createApp(App)
// 使用路由
app.use(router)
// vuex
app.use(store)
app.mount('#app')
