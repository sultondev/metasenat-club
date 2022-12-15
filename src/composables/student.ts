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

    function validateInputAll(sponsorId: number | string, sums: string) {
        return sponsorIdValidation(sponsorId) && sumsValidation(sums);
    }

    function transformSums(sums: string) {
        return Number(sums.replace(/ /g, ''))
    }

    function sumsValidation(sums: string) {
        const sum = transformSums(sums)
        return sum > 1000000 && sum <= 9000000;
    }

    function sponsorIdValidation(sponsorId: number | string) {
        return Boolean(sponsorId);
    }

    return {getDiplomaType, validateInputAll, sponsorIdValidation, sumsValidation, transformSums}
}