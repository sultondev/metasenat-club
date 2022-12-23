export function transformSums(sums: string | number) {
    const sum = String(sums);
    return Number(sum.replace(/ /g, ''))
}

export function numberWithSpaces(x: string | number) {
    if (!isNaN(Number(x))) {
        return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return false
}