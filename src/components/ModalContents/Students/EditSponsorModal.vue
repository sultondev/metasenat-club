<template>
  <section class="px-8 py-7 w-[530px]">
    <div class="">
      <h6 class="text-2xl font-bold">
        Homiylarni tahrirlash
      </h6>
    </div>
    <div class="separate__line"></div>
    <div class="" v-if="sponsor.sponsorsOptions.length > 0">
      <BaseFormGroup id="edit-name" label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                     variant="1" class="mb-7">
        <OneSelect :options="sponsor.sponsorsOptions" :variant="1" v-model="sponsor.selectedSponsor"
                   :default-value="props.sponsorId">

        </OneSelect>
      </BaseFormGroup>
      <BaseFormGroup id="" variant="1" label-title="Ajratilingan summa">
        <BaseInput
            classes="bg-[#E0E7FF33] border border-[#E0E7FF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
            :default-value="numberWithSpaces(sponsor.sums)" v-maska:[masks.sums] v-model="sponsor.sums"
            :is-wrong="sponsor.limit.status || v$.sums.$error"/>
      </BaseFormGroup>
      <span class="text-rose-600 text-xs" v-if="sponsor.limit.status">Homiyda u miqdordagi summa mavjud emas !</span>

    </div>
    <div class="separate__line my-7 w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="flex items-center justify-end gap-[17px]">
      <BaseButton class="gap-2" text="Homiyni O'chirish"
                  classes="bg-rose-100 hover:bg-[#FF4945] hover:text-white py-[11px] px-8 text-sm  text-[#FF4945] rounded items-center"
                  @delete-sponsor="deleteSponsor" action-name="deleteSponsor"
      >
        <span class="icon-trash text-xl  text-[#FF4945] text-inherit"></span>
      </BaseButton>
      <BaseButton class="gap-2" text="Saqlash"
                  :classes="['py-2.5 px-8 bg-[#3366FF] text-white hover:text-[#3366FF] rounded text-sm', 'hover-primary__buttons']"
                  @save-changes="saveChanges" action-name="saveChanges"
      >
        <span class="icon-save text-xl"></span>
      </BaseButton>
    </div>

  </section>
</template>


<script setup lang="ts">
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import OneSelect from "@/components/UI/OneSelect.vue";
import {publicApi} from "@/plugins/axios";
import {reactive, Ref, ref, watch} from "vue";
import {studentSponsors} from "@/typing/enums/student";
import BaseInput from "@/components/UI/BaseInput.vue"
// @ts-ignore
import {vMaska} from "maska"
import BaseButton from "@/components/UI/BaseButton.vue";
import {transformSums} from "@/helpers/sum";
import {numberWithSpaces} from "@/helpers/sum"
import {useVuelidate} from "@vuelidate/core";
import {rules, sponsorRules} from "@/constants/vuelidate"
import {telAndSumMask} from "@/plugins/vmaska"
import {required} from "@vuelidate/validators";
import {minSum} from "@/plugins/vuelidate";

interface Props {
  sponsorId: number
  studentId: number
}


interface Emits {
  (e: "updateSponsors", val: number): void

  (e: "closeModal", val: number): void
}


const masks = {
  ...telAndSumMask
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const sponsors: Ref<studentSponsors[]> = ref([])
const sponsor: any = reactive({
  selectedStudent: props.studentId,
  selectedSponsor: props.sponsorId,
  sponsorsOptions: [],
  sums: "0",
  index: 0,
  payIndex: 0,
  limit: {
    status: false,
    message: "Homiyda u miqdordagi summa mavjud emas !"
  }
})

const rules = {
  sums: {
    required,
    minSum,
  }
}

const v$ = useVuelidate(rules, sponsor)

fetchSponsors(props.studentId)

watch(() => sponsor.sums, () => {
  sponsor.limit.status = false
})

watch(() => sponsor.selectedSponsor, () => {
  sponsor.index = sponsors.value.findIndex((item: studentSponsors) => item.sponsor.id === sponsor.selectedSponsor)
  console.log(String(sponsors.value[sponsor.index].summa))
  sponsor.sums = String(sponsors.value[sponsor.index].summa)
})

async function fetchSponsors(id: any) {
  try {
    const response: any = await publicApi.get(`/student-sponsor/${id}`)
    if (response.status === 200) {
      sponsor.sponsorsOptions = response.data.sponsors.map((item: studentSponsors) => ({
        label: item.sponsor.full_name,
        id: item.sponsor.id,
      }))
      sponsors.value = response.data.sponsors
      sponsor.index = sponsors.value.findIndex((item: studentSponsors) => item.sponsor.id == sponsor.selectedSponsor)
      sponsor.sums = String(sponsors.value[sponsor.index].summa)
      sponsor.payIndex = sponsors.value[sponsor.index].id
    }
  } catch (error: any) {
    console.log(error)
  }
}


const deleteSponsor = async () => {
  console.log('deleted', sponsor.payIndex)
  try {
    const response = await publicApi.delete(`/sponsor-summa-delete/${sponsor.payIndex}/`)
    console.log(response)
    if (response.status === 204) {
      emits('closeModal', 3)
      emits('updateSponsors', props.studentId)
    }
  } catch (error) {
    console.log(error)
  }
}

const saveChanges = async () => {
  const data = {
    sponsor: props.sponsorId,
    summa: transformSums(sponsor.sums),
    student: props.studentId
  }
  console.log(sponsor.payIndex)
  const result = await v$.value.$validate()
  console.log(result)
  if (result) {
    try {
      const response = await publicApi.patch(`/sponsor-summa-update/${sponsor.payIndex}/`, data)
      if (response.status === 200) {
        emits('closeModal', 3)
        emits('updateSponsors', props.studentId)
        sponsor.limit.status = false
      }
    } catch (error: any) {
      const {response} = error
      if (response.status) sponsor.limit.status = true
    }
  }
}

</script>