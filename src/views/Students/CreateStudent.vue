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

    <div class="container mx-auto mb-7">
      <div class="bg-white rounded-xl p-8 max-w-[790px] w-full mx-auto mb-10 mt-10">
        <div class="flex justify-between gap-x-7 w-full mb-7">
          <BaseFormGroup variant="1" label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                         label-classes="block text-xs mb-2 uppercase w-full"
                         id="student-create-name">
            <BaseInput v-model="application.full_name" id="student-create-name" hint="Abdullayev Abdulla Abdulla o’g’li"
                       classes="bg-[#E0E7FF33] border border-[#E0E7FF] w-full focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
                       :required="true" :max-len="100" :min-len="5"
            />
          </BaseFormGroup>

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
                         :required="true"
                         minlength="14"
                         autocomplete="off"
              />
            </BaseFormGroup>
          </BaseFormGroup>

        </div>
        <div class="mb-7">
          <BaseFormGroup id="otm" :variant="1" label-title="OTM" label-classes="block text-xs mb-2 uppercase w-full">
            <OneSelect :variant="1" :options="instituteOptions" label-classes=""
                       title="Institut tanlanmagan"
                       v-model="application.institute.id" required/>
          </BaseFormGroup>
        </div>
        <div class="flex gap-x-7">
          <BaseFormGroup id="student-type" variant="1" label-title="Talabalik turi"
                         label-classes="block text-xs mb-2 uppercase w-full">
            <OneSelect title="Talim turi tanlanmagan"
                       :options="studyType" :variant="1" required v-model="application.type"
                       dropdown-class="z-[10]"></OneSelect>
          </BaseFormGroup>
          <BaseFormGroup id="" variant="1" label-title="Kontrakt summa"
                         label-classes="block text-xs mb-2 uppercase w-full">
            <BaseInput id="summa" classes=""
                       class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF]"
                       v-model="application.contract" :required="true"
                       :max-len="10" hint="Summani kiriting" v-maska:[maskaOpt]
            />
          </BaseFormGroup>
        </div>
        <div class="separate__line my-7 w-full h-[2px] bg-[#F5F5F7]"></div>
        <div class="flex justify-end">
          <BaseButton action-name="create-student"
                      classes='flex items-center py-2.5 px-8 bg-[#3366FF] rounded text-sm font-medium  text-white gap-3'
                      :class="[hoverForButtons]"
                      text="Qo'shish"
                      @create-student="createStudent"
          >
            <span class="icon-increase font-normal text-2xl"></span>
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useVuelidate} from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'


import {useRouter} from "vue-router"
import {reactive, Ref, ref} from "vue";

import {studentType} from "@/typing/types/students";
import {StudentTypes} from "@/typing/enums/student";

import TheHeader from "@/components/TheHeader.vue"
import OneSelect from "@/components/UI/OneSelect.vue"
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import BaseButton from "@/components/UI/BaseButton.vue"
import {hoverForButtons} from "@/constants/UI-styles"
import {publicApi} from "@/plugins/axios";
import {useStudents} from "@/composables/student";
import {vMaska} from "maska";

fetchInstitutes()

// composables destructuring
const {transformSums, getDiplomaType, getInstitute} = useStudents()

const maskaOpt = {
  mask: '# ### ###',
}

const masks = reactive({
  tel: {
    mask: "## ###-##-##",
  }
})

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
const application: studentType = reactive({
  id: 0,
  full_name: "",
  phone: "",
  contract: 0,
  type: 0,
  given: 0,
  institute: {
    id: 0
  },
})


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

function findInstituteName(id: any) {
  const index = instituteOptions.value.findIndex(item => item.id === id);
  return instituteOptions.value[index].label
}

async function createStudent() {
  const data = {
    full_name: application.full_name,
    type: Number(application.type),
    phone: application.phone,
    institute: Number(application.institute.id),
    contract: transformSums(String(application.contract)),
    given: Number(application.given)
  }
  try {
    const response = await publicApi.post("/student-create/", data)
    if (response.status === 201) {
      console.log(response)
      await router.push({path: `/main/students/${response.data.id}`})
    }
  } catch (error) {
    console.log(error)
  }
}

</script>