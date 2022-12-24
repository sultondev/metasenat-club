<template>
  <form class="min-w-[586px] p-[28px]" @submit.prevent>
    <ModalHeaders title="Tahrirlash" @close-modal="$emit('close-modal')"></ModalHeaders>
    <div class="separate__line my-7"></div>
    <div class="flex flex-col gap-7">

      <BaseFormGroup label-title="F.I.Sh. (Familiya Ism Sharifingiz)" variant="1" id="edit-student-name">
        <BaseInput :classes="styleBaseFormGroup2" v-model="student.full_name" :default-value="student.full_name"
                   :is-wrong="inputErrors.full_name"
                   maxlength="30"
        />
      </BaseFormGroup>

      <BaseFormGroup variant="2" label-title="Telefon Raqam" :label-classes="styleBaseFormGroup2"
                     :is-wrong="inputErrors.phone">
        <template #defVal>
          <span class="">+998</span>
        </template>
        <BaseInput :classes="defaultInput" v-model="student.phone" v-maska:[masks.tel] :default-value="student.phone"/>
      </BaseFormGroup>

      <BaseFormGroup id="" variant="1" label-title="OTM">
        <OneSelect :variant="1" :options="sponsorsOptions" :default-value="student.institute"
                   v-model="student.institute"></OneSelect>
      </BaseFormGroup>

      <BaseFormGroup variant="1" label-title="Kontrakt miqdori" :wrong-data="contractError">
        <BaseInput class="modal-form__input" v-model="student.contract" :default-value="student.contract"
                   v-maska:[masks.sums]
                   :is-wrong="inputErrors.contract.empty || inputErrors.contract.minSum || inputErrors.contract.maxSum"
        />
      </BaseFormGroup>

    </div>
    <div class="separate__line my-7"></div>
    <div class="w-full flex justify-end">
      <BaseButton text="Saqlash" @save-changes="saveChanges" action-name="saveChanges"
                  :classes="['hover-primary__buttons', 'hover:text-primary hover:bg-transparent text-white bg-primary rounded py-2 px-8 text-sm gap-2']">
        <span class="icon-save text-2xl"></span>
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import ModalHeaders from "@/components/ModalContents/ModalHeaders.vue"
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import {styleInputs, styleBaseFormGroup2, defaultInput} from "@/constants/UI-styles"
import OneSelect from "@/components/UI/OneSelect.vue"
import BaseButton from "@/components/UI/BaseButton.vue"

import {telAndSumMask} from "@/plugins/vmaska"
// @ts-ignore
import {vMaska} from "maska";
import {computed, reactive, ref} from "vue";
import {publicApi} from "@/plugins/axios";
import {numberWithSpaces, transformSums} from "@/helpers/sum"
import {useVuelidate} from "@vuelidate/core";
import {rules} from "@/constants/vuelidate";
import {contractValidation} from "@/plugins/vuelidate";
import {editStudentTypes} from "@/typing/types/students";

interface Props {
  studentId: number
}

interface Emits {
  (e: 'closeModal', val: number): void

  (e: 'updateStudent', val: number): void
}

const masks = reactive(telAndSumMask)

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const student: editStudentTypes = reactive({
  full_name: "",
  phone: "",
  institute: 0,
  contract: "",
})
const sponsorsOptions = ref([])


const v$ = useVuelidate(rules, student)
fetchStudent(props.studentId)


async function saveChanges() {
  const data = {
    ...student,
    contract: transformSums(student.contract),
    phone: '+998' + student.phone
  }
  const result = await v$.value.$validate()
  if (result) {
    try {
      const response = await publicApi.patch(`/student-update/${props.studentId}/`, data)
      console.log(response)
      if (response.status === 200) {
        emits('closeModal', 1)
        emits('updateStudent', props.studentId)
      }
    } catch (error) {
      console.log(error)
      console.log(result)
    }
  }
}

const inputErrors = computed(() => {
  return {
    full_name: v$.value.full_name.$error,
    phone: v$.value.phone.$error,
    contract: {
      error: v$.value.contract.$error,
      minSum: v$.value.contract.$error && v$.value.contract.checkMin.$invalid,
      empty: v$.value.contract.$error && v$.value.contract.notEmpty.$invalid,
      maxSum: v$.value.contract.$error && v$.value.contract.checkMax.$invalid
    }
  }
})

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


async function fetchStudent(id: any) {
  try {
    const response: any = await publicApi.get(`/student-detail/${props.studentId}`)
    const {full_name, institute, phone, contract, id} = response.data
    student.full_name = full_name
    student.contract = numberWithSpaces(contract) || "0"
    student.phone = phone.slice(4)
    student.institute = institute.id
    await fetchInstitutes()
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

async function fetchInstitutes() {
  try {
    const response = await publicApi.get('/institute-list/')
    if (response.status === 200) {
      sponsorsOptions.value = response.data.map((item: any) => ({
        id: item.id,
        label: item.name
      }))
    }
  } catch (error) {
    console.log(error)
  }
}


</script>