import {sponsorshipValidation} from "@/plugins/vuelidate";
import {useSponsors} from "@/composables/sponsors";

const {numberWithSpaces} = useSponsors()

export const defaultInputFields = {
    sponsorId: {
        status: false,
        message: "Iltimos, homiyni quyidagi ro'yxatdan tanlang"
    },
    sums: {
        status: false,
        message: `Kiritilayotgan summa ${numberWithSpaces(sponsorshipValidation.minSum)} so'mdan kam yoki ${numberWithSpaces(sponsorshipValidation.maxSum)} mln so'mdan ko'p bo'la olmaydi`
    },
    sponsorSumLimit: {
        status: false,
        message: "Homiyda u miqdordagi summa mavjud emas !"
    }
}