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

type studentInstitute = {
    id: number
    name: string
}