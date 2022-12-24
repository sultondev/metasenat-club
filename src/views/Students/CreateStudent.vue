<template>
  <section class="">
    <TheHeader left-classes="flex" right-classes="">
      <template #left>
        <button class="mr-6" @click="router.back()"><img
            src="@/assets/icons/website/back-icon.svg"
            alt="Back Icon"></button>
        <h6 class="text-2xl font-bold  mr-[12px]">Talaba qo‘shish</h6>
      </template>
    </TheHeader>

    <form class="container mx-auto mb-7" @submit.prevent>
      <div class="bg-white rounded-xl p-8 max-w-[790px] w-full mx-auto mb-10 mt-10">
        <div class="flex justify-between gap-x-7 w-full mb-7">
          <div class="w-full">
            <BaseFormGroup variant="1" label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                           label-classes="block text-xs mb-2 uppercase w-full"
                           id="student-create-name" :is-wrong="inputErrors.full_name"
                           maxlength="30"
            >
              <BaseInput v-model="application.full_name" id="student-create-name"
                         hint="Abdullayev Abdulla Abdulla o’g’li"
                         classes="bg-[#E0E7FF33] border border-[#E0E7FF] w-full focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
                         :required="false" maxlength="25" minlen="5"
                         :is-wrong="inputErrors.full_name"
              />
            </BaseFormGroup>
            <span class="text-red-600 text-xs" v-show="inputErrors.full_name">Iltimos, bu maydonni to'ldiring</span>
          </div>
          <div class="w-full">
            <BaseFormGroup variant="1" id="student-create-phone" label-title="Telefon raqamingiz"
                           label-classes="block text-xs mb-2 uppercase">
              <BaseFormGroup id="student-create-phone" variant="2"
                             label-classes="flex items-center bg-[#E0E7FF33] border border-[#E0E7FF] py-3 px-4 focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF] rounded-md outline-none text-[15px]"
                             :is-wrong="inputErrors.phone"
              >
                <template #defVal>
                  <span class="mr-1">+998</span>
                </template>
                <BaseInput v-model="application.phone" id="phoneNumber" inp-type="text"
                           class="bg-transparent outline-0 text-[15px]"
                           hint="00 000-00-00"
                           v-maska:[masks.tel]
                           :required="false"
                           minlength="14"
                           autocomplete="off"
                />
              </BaseFormGroup>
              <span class="text-red-600 text-xs" v-show="inputErrors.phone">Iltimos, bu maydonni to'ldiring</span>
            </BaseFormGroup>
          </div>


        </div>
        <div class="mb-7">
          <BaseFormGroup id="otm" variant="1" label-title="OTM" label-classes="block text-xs mb-2 uppercase w-full">
            <OneSelect :variant="1" :options="instituteOptions" label-classes=""
                       title="Institut tanlanmagan"
                       v-model="application.institute" required
                       :is-wrong="inputErrors.institute"
            />
          </BaseFormGroup>
          <span class="text-red-600 text-xs" v-show="inputErrors.institute">Institut tanlanmagan</span>
        </div>
        <div class="flex gap-x-7">
          <div class="w-full">
            <BaseFormGroup id="student-type" variant="1" label-title="Talabalik turi"
                           label-classes="block text-xs mb-2 uppercase w-full" :is-wrong="inputErrors.type"
                           :wrong-data="studyTypeError">
              <OneSelect title="Talim turi tanlanmagan"
                         :options="studyTypes" :variant="1" required v-model="application.type"
                         dropdown-class="z-[10]" :is-wrong="inputErrors.type">
              </OneSelect>
            </BaseFormGroup>
          </div>
          <div class="w-full">
            <BaseFormGroup id="" variant="1" label-title="Kontrakt summa"
                           label-classes="block text-xs mb-2 uppercase w-full"
                           :is-wrong="inputErrors.contract.error"
                           :wrong-data="contractError"
            >
              <BaseInput id="summa" classes=""
                         class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF]"
                         v-model="application.contract" :required="false"
                         hint="Summani kiriting" v-maska:[masks.sums]
                         :is-wrong="v$.contract.$error"
              />
            </BaseFormGroup>
          </div>
        </div>
        <div class="separate__line my-7 w-full h-[2px] bg-[#F5F5F7]"></div>
        <div class="flex justify-end">
          <BaseButton action-name="create-student"
                      classes='hover-primary__buttons flex items-center py-2.5 px-8 bg-[#3366FF] rounded text-sm font-medium  text-white gap-3'
                      text="Qo'shish"
                      type="submit"
                      @create-student="createStudent"
          >
            <span class="icon-increase font-normal text-2xl"></span>
          </BaseButton>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router"
import {computed, reactive, Ref, ref} from "vue";

import TheHeader from "@/components/TheHeader.vue"
import OneSelect from "@/components/UI/OneSelect.vue"
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import BaseButton from "@/components/UI/BaseButton.vue"

import {publicApi} from "@/plugins/axios";
import {useStudents} from "@/composables/students";
import {minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {contractValidation} from "@/plugins/vuelidate";
// @ts-ignore
import {vMaska} from "maska"
import {checkMin, checkMax} from "@/plugins/vuelidate";
import {transformSums} from "@/helpers/sum";
import {optionsType} from "@/typing/types/oneSelect";
import {studyTypes} from "@/constants/institute"
import {notEmpty, shouldBeChosen} from "@/plugins/vuelidate";

fetchInstitutes()

// composables destructuring

const {getInstitute, sumsValidation} = useStudents()


const instituteOptions: Ref<optionsType[]> = ref([])
const router = useRouter()
// @ts-ignore
const application: any = reactive({
  full_name: "",
  phone: "",
  contract: "",
  type: "",
  institute: "",
})


const masks = reactive({
  tel: {
    mask: "## ###-##-##",
  },
  sums: {
    mask: (value: any) => value.length > 9 ? '## ### ###' : '# ### ###',
  }
})


const rules = {
  full_name: {required, minlength: minLength(4)},
  type: {required},
  phone: {required, minlength: minLength(12)},
  contract: {
    required,
    checkMin,
    checkMax,
    notEmpty
  },
  institute: {
    required, shouldBeChosen,
  }
}

const v$ = useVuelidate(rules, application)

const inputErrors = computed(() => {
  return {
    full_name: v$.value.full_name.$error,
    phone: v$.value.phone.$error,
    institute: v$.value.institute.$error,
    type: v$.value.type.$error,
    contract: {
      error: v$.value.contract.$error,
      minSum: v$.value.contract.$error && v$.value.contract.checkMin.$invalid,
      empty: v$.value.contract.$error && v$.value.contract.notEmpty.$invalid,
      maxSum: v$.value.contract.$error && v$.value.contract.checkMax.$invalid
    }
  }
})

const studyTypeError = computed(() => [{
  condition: inputErrors.value.type,
  message: "Student O'qish turi tanlanishi shart"
}])

const contractError = computed(() => [{
  condition: inputErrors.value.contract.maxSum,
  message: `Maximum kontrakt narxi ${contractValidation.maxContract} mlni tashkil etadi`
}, {
  condition: inputErrors.value.contract.minSum,
  message: `Minumum kontrakt narxi ${contractValidation.minContract} mlni tashkil etadi`
},
  {
    condition: inputErrors.value.contract.empty,
    message: "Summma kiriting"
  }
])


async function fetchInstitutes() {
  try {
    const response = await publicApi.get("/institute-list")
    if (response.status === 200) {
      instituteOptions.value = await sortInstitutesByABC(response.data.map((item: { id: any, name: string }) => ({
        id: item.id,
        label: item.name
      })))
    }
  } catch (error) {
    console.log(error)
  }
}

function sortInstitutesByABC(value: any) {
  return value.sort((a: any, b: any) => a.label.localeCompare(b.label))
}

async function createStudent() {
  const data = {
    full_name: application.full_name,
    type: Number(application.type),
    phone: '+998' + application.phone,
    institute: application.institute,
    contract: transformSums(String(application.contract)),
  }
  const result = await v$.value.$validate()
  if (result) {
    try {
      const response = await publicApi.post("/student-create/", data)
      if (response.status == 201) {
        await router.push({path: `/main/students/${response.data.id}`})
      }
    } catch (error) {
      console.log(error)
    }
  }
}

</script>