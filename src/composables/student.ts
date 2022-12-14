import {StudentTypes} from "@/typing/enums/student";

export const useStudents = () => {

    const getDiplomaType = (type: number | string) => {
        switch (type) {
            case 1:
                return StudentTypes.bakalavr
            case 2:
                return StudentTypes.magistratura
            case 3:
                return StudentTypes.doktorantura
            default:
                return StudentTypes.bakalavr
        }
    }

    return {getDiplomaType}
}