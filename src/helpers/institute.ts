import {StudentTypes} from "@/typing/enums/student";

export const getDiplomaType = (type: number | string) => {
    if (type == 1) return StudentTypes.bakalavr
    else if (type == 2) return StudentTypes.magistratura
    else if (type == 3) return StudentTypes.doktorantura
    else return StudentTypes.bakalavr
}