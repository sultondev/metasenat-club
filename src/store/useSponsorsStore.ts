import {defineStore} from "pinia";
import {ref} from "vue";

export const useSponsorStore = defineStore('useSponsorStore', () => {
    const loading = ref(true)

    return {loading}
})