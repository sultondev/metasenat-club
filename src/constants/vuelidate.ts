import {maxLength, minLength, required} from "@vuelidate/validators";
import {checkMax, checkMin, notEmpty, minSum} from "@/plugins/vuelidate";

export const rules = {
    full_name: {required, minlength: minLength(4)},
    phone: {required, minlength: minLength(12)},
    contract: {
        required,
        checkMin,
        checkMax,
        notEmpty
    },
}


export const sponsorRules = {
    fullName: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
    },
    phoneNumber: {
        required,
        minlength: minLength(12)
    },
    sums: {
        required,
        minSum,
    }
}