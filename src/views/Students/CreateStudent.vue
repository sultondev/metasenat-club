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
                           id="student-create-name">
              <BaseInput v-model="application.full_name" id="student-create-name"
                         hint="Abdullayev Abdulla Abdulla o’g’li"
                         classes="bg-[#E0E7FF33] border border-[#E0E7FF] w-full focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
                         :required="false" :max-len="25" :min-len="5"
              />
            </BaseFormGroup>
            <span class="text-red-600" v-show="v$.full_name.$invalid">Iltimos, bu maydonni to'ldiring</span>
          </div>
          <div class="w-full">
            <BaseFormGroup variant="1" id="student-create-phone" label-title="Telefon raqamingiz"
                           label-classes="block text-xs mb-2 uppercase">
              <BaseFormGroup id="student-create-phone" variant="2"
                             label-classes="flex items-center bg-[#E0E7FF33] border border-[#E0E7FF] py-3 px-4 focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF] rounded-md outline-none text-[15px]">
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
              <span class="text-red-600" v-show="v$.phone.$invalid">Iltimos, bu maydonni to'ldiring</span>
            </BaseFormGroup>
          </div>


        </div>
        <div class="mb-7">
          <BaseFormGroup id="otm" :variant="1" label-title="OTM" label-classes="block text-xs mb-2 uppercase w-full">
            <OneSelect :variant="1" :options="instituteOptions" label-classes=""
                       title="Institut tanlanmagan"
                       v-model="application.institute" required/>
          </BaseFormGroup>
          <span class="text-red-600" v-show="v$.institute.$invalid">Institut tanlanmagan</span>
        </div>
        <div class="flex gap-x-7">
          <div class="w-full">
            <BaseFormGroup id="student-type" variant="1" label-title="Talabalik turi"
                           label-classes="block text-xs mb-2 uppercase w-full">
              <OneSelect title="Talim turi tanlanmagan"
                         :options="studyType" :variant="1" required v-model="application.type"
                         dropdown-class="z-[10]">
              </OneSelect>
            </BaseFormGroup>
            <span class="text-red-600" v-show="v$.type.$invalid">Student O'qish turi tanlanishi shart</span>
          </div>
          <div class="w-full">
            <BaseFormGroup id="" variant="1" label-title="Kontrakt summa"
                           label-classes="block text-xs mb-2 uppercase w-full">
              <BaseInput id="summa" classes=""
                         class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF]"
                         v-model="application.contract" :required="false"
                         hint="Summani kiriting" v-maska:[masks.sums]
              />
            </BaseFormGroup>
            <div class=""></div>
            <span class="text-red-600"
                  v-show="v$.contract.$error && v$.contract.checkMax.$invalid">Maximum kontrakt narxi {{
                contractValidation.maxContract
              }} mlni tashkil etadi</span>

            <span class="text-red-600"
                  v-show="v$.contract.$error &&
                  v$.contract.checkMin.$invalid">Minumum kontrakt narxi {{
                contractValidation.minContract
              }} mlni tashkil etadi</span>

            <span class="text-red-600" v-show="v$.contract.notEmpty.$invalid">
              Summma kiriting
            </span>
          </div>
        </div>
        <div class="separate__line my-7 w-full h-[2px] bg-[#F5F5F7]"></div>
        <div class="flex justify-end">
          <BaseButton action-name="create-student"
                      classes='flex items-center py-2.5 px-8 bg-[#3366FF] rounded text-sm font-medium  text-white gap-3'
                      :class="[hoverForButtons]"
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
import {reactive, Ref, ref} from "vue";

import TheHeader from "@/components/TheHeader.vue"
import OneSelect from "@/components/UI/OneSelect.vue"
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import BaseButton from "@/components/UI/BaseButton.vue"
import {hoverForButtons} from "@/constants/UI-styles"
import {publicApi} from "@/plugins/axios";
import {useStudents} from "@/composables/student";
import {minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useSponsors} from "@/composables/sponsors";
import {contractValidation} from "@/plugins/vuelidate";
// @ts-ignore
import {vMaska} from "maska"

fetchInstitutes()

// composables destructuring
const {numberWithSpaces} = useSponsors()
const {transformSums, getDiplomaType, getInstitute, sumsValidation} = useStudents()


type optionsType = {
  label: string;
  id: number;
}
const instituteOptions: Ref<optionsType[]> = ref([])
const studyType = reactive([
  {
    id: 1,
    label: 'Bakalavr',
  },
  {
    id: 2,
    label: 'Magistratura',
  },
  {
    id: 3,
    label: 'Doktorantura'
  }
])
const router = useRouter()
// @ts-ignore
const application: any = reactive({
  full_name: "",
  phone: "",
  contract: null,
  type: null,
  institute: null,
})


function notEmpty(value: any) {
  return value
}


const masks = reactive({
  tel: {
    mask: "## ###-##-##",
  },
  sums: {
    mask: (value: any) => value.length > 9 ? '## ### ###' : '# ### ###',
  }
})

const shouldBeChosen = (value: any) => {
  return value > 0
}


function checkMin(num: any) {
  return transformSums(num) ? transformSums(num) > contractValidation.minContract : true
}

function checkMax(num: any) {
  return transformSums(num) < contractValidation.maxContract
}

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


async function fetchInstitutes() {
  try {
    const response = await publicApi.get("/institute-list")
    if (response.status === 200) {
      console.log(response)
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
  console.log(result)
  if (result) {
    try {
      const response = await publicApi.post("/student-create/", data)
      if (response.status == 201) {
        console.log(response)
        await router.push({path: `/main/students/${response.data.id}`})
      } else {
        console.log('bug')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

</script>