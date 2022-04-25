import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'


let app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
