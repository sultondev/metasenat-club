export enum StudentTypes {
    bakalavr = 'bakalavr',
    magistratura = 'magistratura',
    doktorantura = 'doktorantura'
}

export type sponsor = {
    id: number,
    full_name: string
}

export type studentSponsors = {
    id: number,
    sponsor: sponsor,
    summa: number
}