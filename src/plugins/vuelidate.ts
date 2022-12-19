import {transformSums} from "@/helpers/sum";

export const contractValidation = {
    minContract: 5800000,
    maxContract: 68000000
}

export const sponsorshipValidation = {
    minSum: 500000,
    maxSum: 90000000
}

export function checkMin(num: any) {
    return transformSums(num) ? transformSums(num) > contractValidation.minContract : true
}

export function checkMax(num: any) {
    return transformSums(num) < contractValidation.maxContract
}