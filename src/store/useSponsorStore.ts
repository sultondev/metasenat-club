import {defineStore} from "pinia";

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
export const useSponsorStore = defineStore<string, { activePage: number, sponsorsList: sponsorsListType[] }>("useSponsorStore", {
    state: () => {
        return {
            activePage: 1,
            sponsorsList: []
        }
    },

})