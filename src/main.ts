import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";
import {createPinia} from "pinia"
import {authProtectedApi, fetchData, publicApi} from "@/plugins/axios"
import VueApexCharts from 'vue3-apexcharts'
import ApexCharts from 'apexcharts';

const app = createApp(App)
const pinia = createPinia()
app.config.globalProperties.$apexcharts = ApexCharts;

app.use(pinia)
app.use(router)
app.use(VueApexCharts)

app.component('apexchart', VueApexCharts)
app.provide("axios", publicApi)
app.provide("fetchData", fetchData)
app.provide("protectedApi", authProtectedApi)


app.mount('#app')
