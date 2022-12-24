import {reactive} from "vue";

type instituteType = {
    id: number
    name: string
}

export type studentType = {
    id: number,
    full_name: string,
    phone: string,
    institute: instituteType
    type: number
    get_status_display: string
    contract: number
    given: number
}

export type studentsListType = {
    id: number;
    full_name: string
    type: number
    phone: string
    institute: studentInstitute,
    contract: number;
    given: number
    get_status_display: string
}

type sponsorType = {
    id: number,
    full_name: string,
    sponsor: {
        "id": number,
        "full_name": string
    },
    "summa": number
}


export type studentInstitute = {
    id: number
    name: string
}

export type studentSponsorType = {
    id: number,
    full_name: string,
    given: number,
    get_status_display: string,
    sponsor: sponsorType
    summa: ''
}

export type editStudentTypes = {
    full_name: string,
    phone: string,
    institute: number,
    contract: string,
}