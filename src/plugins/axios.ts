// axios.ts

import axios from "axios"
import type {App} from "vue"

interface AxiosOptions {
    baseUrl?: string
    token?: string
}

export const axiosInstance = axios.create({
    baseURL: "https://metsenatclub.xn--h28h.uz/api/v1/",
})