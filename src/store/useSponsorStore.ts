import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {applicationType} from "@/typing/types/sponsors";
import {SPONSOR} from "@/typing/enums/sponsor";


interface Store {
    application: applicationType
}

export const useSponsorStore = defineStore('sponsor-store', {
    state: () => ({
        application: {
            fullName: "",
            phoneNumber: "",
            sums: "",
            yourSums: "0",
            sponsorFirm: SPONSOR.LEGALENTITY,
            sponsorType: ""
        }
    })
})