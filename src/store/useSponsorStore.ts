import {defineStore} from "pinia";
import {ref} from "vue";
import {publicApi} from "@/plugins/axios";
import {fetchData} from "@/plugins/axios";
import {useRoute, useRouter} from "vue-router";
import {sponsorStoreInterface} from "@/typing/interfaces/sponsorStoreInterface";
import {sponsorsListType} from "@/typing/types/useSponsorStore";


// @ts-ignore
export const useSponsorStore = defineStore<string, sponsorStoreInterface>("useSponsorStore", {
    state: () => {
        return {
            activePage: 1,
            pageSize: 15,
            sponsorsList: [],
            sponsorsFilter: "",
            count: 0
        }
    },
    getters: {
        fetchSponsors: () => {
            return async (page: string | number) => {
                try {
                    const response = await publicApi.get(`/sponsor-list/?page=${page}`)
                    if (response.status === 200) {
                        return response.data.results
                    }
                } catch {
                    return "404"
                }
            }
        },
        filterSponsorsByName(state) {
            // @ts-ignore
            return function (filters: string) {
                if (filters.length > 0) {
                    return state.sponsorsList.filter((item: sponsorsListType) => {
                        const lowVer = item.full_name.toLowerCase()
                        return lowVer.includes(filters.toLowerCase())
                    })
                } else {
                    return state.sponsorsList
                }
            }
        },
        getPaginationCount(state) {
            return Math.floor(state.count / state.pageSize + 1)
        },
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