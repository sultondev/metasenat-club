export function numberWithSpaces(x: string | number) {
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}