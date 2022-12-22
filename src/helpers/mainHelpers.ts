import {sponsorStatuses} from "@/constants/sponsors";

export const formatStatuses = (value: string) => {
    if (value) {
        const lowVer = value.toLowerCase()
        const index = sponsorStatuses.findIndex((item: any) => item.label === lowVer)
        return sponsorStatuses[index].id
    } else {
        return false
    }
}

export const checkArray = (theArray: any) => {
    if (Array.isArray(theArray)) {
        return theArray
    } else if (theArray) {
        return [theArray]
    }
    return false
}