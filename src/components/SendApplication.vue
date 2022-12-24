<template>
  <div class="w-full bg-transparent">
    <h4 class="font-bold text-[40px] max-w-[423px] mb-10 ">
      Homiy sifatida ariza topshirish
    </h4>
    <form class="flex flex-col gap-[28px] grow" @submit.prevent>
      <div class="">
        <InputTablets :options="options" v-model="application.sponsorType"
                      :default-value="SPONSOR.LEGALENTITY"/>
      </div>
      <div>
        <BaseFormGroup variant="1" label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                       label-classes="block text-xs mb-2 uppercase"
                       id="fullName">
          <BaseInput v-model="application.fullName" id="fullName" hint="Abdullayev Abdulla Abdulla o’g’li"
                     classes="modal-form__input"
                     :is-wrong="v$.fullName.$error"
                     maxlength="30"
          />
        </BaseFormGroup>
        <span class="text-red-600" v-show="v$.fullName.$error">Bu bo'lim to'ldirilishi shart</span>
      </div>
      <div>
        <BaseFormGroup variant="1" id="phoneNumber" label-title="Telefon raqamingiz"
                       label-classes="block text-xs mb-2 uppercase">
          <BaseFormGroup id="phoneNumber" variant="2"
                         :label-classes="['modal-form__input form-group__def', {'!border-rose-500': v$.phoneNumber.$error}]"
          >
            <template #defVal>
              <span class="mr-1">+998</span>
            </template>
            <BaseInput v-model="application.phoneNumber" id="phoneNumber" inp-type="text"
                       class="bg-transparent outline-0 text-[15px]"
                       hint="00 000-00-00"
                       v-maska:[masks.tel]
                       autocomplete="off"
            />
          </BaseFormGroup>
        </BaseFormGroup>
        <span class="text-red-600" v-show="v$.phoneNumber.$error">
          Bu bo'lim to'ldirilishi shart
        </span>
      </div>
      <div class="">
        <BaseFormGroup variant="1" id="none" label-title="To‘lov summasi" label-classes="block text-xs mb-3 uppercase">
          <OneSelect v-model="application.sums" :variant="2" :hide-all="false" hint="" required classes="" title=""
                     :options="generousSums" :additional="true"
                     :default-value="1291">
          </OneSelect>
        </BaseFormGroup>
      </div>
      <Transition mode="out-in">
        <div v-if="application.sums === 'boshqa'" class="">
          <BaseInput v-model="application.yourSums"
                     hint="0"
                     class="modal-form__input"
                     v-maska:[masks.sums]
                     :class="{'!border-rose-500':v$.yourSums.validateYourSums.$invalid}"
          />
          <span class="text-red-600" v-show="v$.yourSums.validateYourSums.$invalid">
            Minimal summa 1 000 000
          </span>
        </div>
      </Transition>
      <Transition mode="out-in">
        <div class="" v-if="application.sponsorType === SPONSOR.LEGALENTITY">
          <BaseFormGroup variant="1" id="firmName" label-title="Tashkilot nomi"
                         label-classes="block mb-2 uppercase text-xs">
            <BaseInput v-model="application.sponsorFirm" id="firmName"
                       classes="modal-form__input"
                       hint="Orient group"
                       required
                       :class="{'border-rose-500': v$.$error && !validateSponsorType()}"
            >
            </BaseInput>
          </BaseFormGroup>
          <span class="text-red-600" v-show="v$.$error && !validateSponsorType()">
            Minimal harflar 2
          </span>
        </div>
      </Transition>
      <button type="submit" class="bg-[#2E5BFF] text-white py-3 rounded-md hover:bg-[#364575]"
              @click="onSubmit">
        Yuborish
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref, Ref,} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {maxLength, minLength, required} from "@vuelidate/validators";
import {generousSumsType, optionType} from "@/typing/types/sponsors";

import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import OneSelect from "@/components/UI/OneSelect.vue";
import InputTablets from "@/components/UI/InputTablets.vue"
import {telAndSumMask} from "@/plugins/vmaska";
import {generousOptions, sponsorLegalTypes} from "@/constants/sponsors";

import {SPONSOR} from "@/typing/enums/sponsor";
import {transformSums} from "@/helpers/sum";
// @ts-ignore
import {vMaska} from "maska";
import {publicApi} from "@/plugins/axios";
import {STEPS} from "@/typing/enums/stepper";
import {findSumById} from "@/helpers/mainHelpers";

const masks = reactive(telAndSumMask)

interface Emits {
  (e: "stepChange", val: string): void
}

const emits = defineEmits<Emits>()
const generousSums: Ref<generousSumsType[]> = ref(generousOptions)
// this id fields should be unique
// and these fields should be many to many
const options: Ref<optionType[]> = ref(sponsorLegalTypes)
// const {application} = useSponsorStore()

const application = reactive({
  fullName: "",
  phoneNumber: "",
  sums: "",
  yourSums: "",
  sponsorFirm: "",
  sponsorType: SPONSOR.LEGALENTITY
})

const rules = {
  fullName: {
    required,
    minlength: minLength(3),
    maxlength: maxLength(30)
  },
  phoneNumber: {
    required,
    minlength: minLength(12)
  },
  yourSums: {
    validateYourSums
  },
  sponsorType: {
    validateSponsorType
  }
}

const v$ = useVuelidate(rules, application)


async function onSubmit(args: any) {
  const submitData = {
    full_name: application.fullName,
    phone: '+998' + application.phoneNumber,
    sum: application.sums !== 'boshqa' ? transformSums(findSumById(application.sums)) : transformSums(application.yourSums),
    payment_type: [44],
    firm: application.sponsorFirm,
    spent: 0,
    comment: ""
  }

  const result = await v$.value.$validate()

  if (result && validateSponsorType()) {
    console.log(submitData)
    try {
      const response = await publicApi.post('/sponsor-create/', submitData)

      if (response.status === 201) {
        emits('stepChange', STEPS.SUCCESS)
      }
    } catch (error) {
      console.log(error)
      emits('stepChange', STEPS.ERROR)
    }
  }
}

function validateYourSums(value: any) {
  if (application.sums === 'boshqa') {
    return transformSums(application.yourSums) > 1000000 && transformSums(application.yourSums)
  } else {
    return true
  }
}

function validateSponsorType() {
  return (application.sponsorType === SPONSOR.LEGALENTITY && application.sponsorFirm.length > 2) || application.sponsorType === SPONSOR.INDIVIDUAL;
}


</script>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
