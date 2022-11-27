// axios.ts

import axios, {AxiosRequestConfig} from "axios"
import type {App} from "vue"


const _BASE_CONFIG: AxiosRequestConfig = {
    baseURL: "https://metsenatclub.xn--h28h.uz/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
};

export const authProtectedApi: any = () =>
    axios.create({
        ..._BASE_CONFIG,
        headers: {
            ..._BASE_CONFIG.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const publicApi = axios.create({..._BASE_CONFIG});