import {defineStore} from "pinia";

export const useSponsorStore = defineStore("useSponsorStore", {
    state: () => {
        return {
            activePage: 1,
            sponsorsList: []
        }
    },

})