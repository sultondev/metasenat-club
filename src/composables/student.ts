import {StudentTypes} from "@/typing/enums/student";
import {publicApi} from "@/plugins/axios";
import {ref} from "vue";

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

    const getInstitute = async (id: any) => {
        const institute = ref({})
        try {
            const response = await publicApi.get('institute-list')
            if (response.status === 200) {
                const index = response.data.findIndex((item: any) => item.id === id)
                institute.value = response.data[index.value]
                return institute.value
            }
        } catch (error) {
            console.log(error)
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

    return {getDiplomaType, validateInputAll, sponsorIdValidation, sumsValidation, transformSums, getInstitute}
}