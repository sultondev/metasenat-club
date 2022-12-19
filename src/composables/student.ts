import {StudentTypes} from "@/typing/enums/student";
import {publicApi} from "@/plugins/axios";
import {ref} from "vue";
import {contractValidation, sponsorshipValidation} from "@/plugins/vuelidate";
import {transformSums} from "@/helpers/sum";

export const useStudents = () => {


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


    function sumsValidation(sums: string) {
        const sum = transformSums(sums)
        return sum > contractValidation.minContract && sum <= contractValidation.maxContract;
    }

    function sponsorSumValidation(sums: any) {
        const sum = transformSums(sums)
        return sum > sponsorshipValidation.minSum && sum < sponsorshipValidation.maxSum
    }

    function sponsorIdValidation(sponsorId: number | string) {
        return Boolean(sponsorId);
    }

    return {
        validateInputAll,
        sponsorIdValidation,
        sumsValidation,
        getInstitute,
        sponsorSumValidation
    }
}