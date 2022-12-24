import {publicApi} from "@/plugins/axios";
import {reactive, ref} from "vue";

export const useInstitutes = () => {
    const fetchError = reactive({
        message: "",
        status: false
    })

    async function fetchInstitutes() {
        try {
            const response = await publicApi.get('/institute-list/')
            if (response.status === 200) {
                return response.data
            } else {
                return false
            }
        } catch (error: any) {
            console.log(error)
            fetchError.status = true
            fetchError.message = error.message
        }
    }

    return {fetchInstitutes, fetchError}
}
