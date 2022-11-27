import {defineStore} from "pinia";
import {inject, ref} from "vue";
import {publicApi} from "@/plugins/axios";

type sponsorsListType = {
    created_at: string;
    firm: string;
    full_name: string
    get_status_display: string;
    id: number;
    payment_type: { id: number, title: string }[]
    phone: string
    spent: string
    sum: string
}
// @ts-ignore
export const useSponsorStore = defineStore<string, { activePage: number, sponsorsList: sponsorsListType[], changeActivePage: (value: number) => void; }>("useSponsorStore", {
    state: () => {
        return {
            activePage: 1,
            sponsorsList: []
        }
    },
    actions: {
        async changeActivePage(value: number) {
            const response = ref({})
            try {
                const request = await publicApi.get(`/sponsor-list/?page=${value}`)
                console.log(value)

                if (request.status === 200) {
                    response.value = request
                    this.activePage = value;
                    this.sponsorsList = request.data.results;
                }
                console.log(response.value)
            } catch {
                console.log("api wrong")
            }
        }
    }
    ,
    getters: {
        fetchSponsors: () => {
            return async (page: string | number) => {
                const axios: any = inject("axios")
                try {
                    const response = await axios.get(`/sponsor-list/?page=${page}`)
                    if (response.status === 200) {
                        return response.data.results
                    }
                } catch {
                    return "404"
                }
            }
        }
    }

})

// export const useSponsorStore = defineStore<string, void>("useSponsorStore", () => {
//     const activePage: { value: number } = ref(1)
//     const sponsorsList: { value: sponsorsListType[] } = ref([])
//
//     async function changeActivePage(value: number) {
//         const response = ref({})
//         try {
//             const request = await publicApi.get(`/sponsor-list/?page=${value}`)
//             console.log(value)
//
//             if (request.status === 200) {
//                 response.value = request
//                 activePage.value = value;
//                 sponsorsList.value = request.data.results;
//             }
//             console.log(response.value)
//         } catch {
//             console.log("api wrong")
//         }
//     }
//
//     return {
//         activePage, sponsorsList, changeActivePage
//     }
// })