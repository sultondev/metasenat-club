import {SPONSOR} from "@/typing/enums/sponsor";

export const sponsorStatuses = [
    {
        label: "barchasi",
        id: 101
    },
    {
        label: "yangi",
        id: 102
    },
    {
        label: "moderatsiyada",
        id: 103
    },
    {
        label: "tasdiqlangan",
        id: 104
    },
    {
        label: "bekor qilingan",
        id: 105
    }
]

export const generousOptions = [
    {
        label: "1000000",
        id: 1291820
    },
    {
        label: "5000000",
        id: 88331
    },
    {
        label: "7000000",
        id: 24357
    },
    {
        label: "10000000",
        id: 96884
    },
    {
        label: "30000000",
        id: 2995
    }
]

export const sponsorLegalTypes = [
    {
        id: "rsad",
        title: "Jismoniy shaxs",
        value: SPONSOR.INDIVIDUAL
    },
    {
        id: "dwa",
        title: "Yuridik shaxs",
        value: SPONSOR.LEGALENTITY
    }
]