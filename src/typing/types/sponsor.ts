import {SPONSOR} from "@/typing/enums/sponsor";

export type sponsorsListType = {
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


export type applicationType = {
    fullName: string;
    phoneNumber: string
    sums: string
    yourSums: string
    sponsorType: SPONSOR.LEGALENTITY
    sponsorFirm: string
}


export type optionType = {
    title: string
    value: string
    id: string
}

export type generousSumsType = {
    label: string;
    id: number
}
