import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";
import {createPinia} from "pinia"
import {axiosInstance} from "@/plugins/axios"

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.provide("axios", axiosInstance)

app.mount('#app')
