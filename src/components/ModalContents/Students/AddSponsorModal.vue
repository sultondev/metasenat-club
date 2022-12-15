<template>
  <form class="min-w-[586px] p-[28px]" @submit.prevent>
    <div class="flex justify-between mb-[28px]">
      <h6 class="font-bold text-2xl">Homiy qo'shish</h6>
      <button class="" @click="$emit('close-modal')">
        <span class="icon-close text-2xl text-[#B2B7C1] hover:text-red-600"></span>
      </button>
    </div>
    <div class="separate__line mb-[28px] w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="mb-7">
      <div class="text-red-600">
        <span>{{ inputErrors.sponsorId.status ? inputErrors.sponsorId.message : '' }}</span>
      </div>
      <BaseFormGroup variant="1" label-classes="font-medium text-xs uppercase mb-2"
                     label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                     id="none">
        <OneSelect :title='chosenSponsor ? "Homiy tanlangan" : "Homiy qo‘shish"' label-classes=""
                   :variant="1" required
                   default-value=""
                   v-model="chosenSponsor"
                   classes=""
                   :options="sponsorsOptions"
        />
      </BaseFormGroup>
    </div>
    <div class="mb-7">
      <div class="text-red-600 max-w-[500px]">
        <span class="whitespace-normal">{{ inputErrors.sums.status ? inputErrors.sums.message : '' }}</span>
        <span class="whitespace-normal">
          {{
            inputErrors.sponsorSumLimit.status ? inputErrors.sponsorSumLimit.message : ''
          }}
        </span>
      </div>
      <BaseFormGroup id="summa" :variant="1" label-title="Ajratilingan summa"
                     label-classes="font-medium text-xs uppercase mb-2">
        <BaseInput id="summa" classes=""
                   class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:bg-[#E0E7FF]"
                   v-model="chosenSums" :required="true"
                   :max-len="10" hint="Summani kiriting" v-maska:[maskaOpt]/>
      </BaseFormGroup>
    </div>
    <div class="separate__line mb-7 w-full h-[2px] bg-[#F5F5F7]"></div>

    <div class="flex justify-end">
      <button type="submit" @click="$emit('dataSubmit', chosenSponsor, chosenSums)"
              class="flex bg-[#3366FF] text-white py-2.5 px-8 rounded-[5px] items-center gap-x-2.5">
        <span class="icon-money"></span>
        <span>
      Qo‘shish
      </span>
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
// Components
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import OneSelect from "@/components/UI/OneSelect.vue"

// third part funcs
import {publicApi} from "@/plugins/axios";
import {vMaska} from "maska"
import {ref, watch} from "vue"
// Composable
import {useSponsors} from "@/composables/sponsors"
import {useStudents} from "@/composables/student"

// Types
import {inputErrorsType, sponsorsListType} from "@/typing/types/sponsor";

interface AddSponsorModalProps {
  studentId: number
  inputError: inputErrorsType
}

const maskaOpt = {
  mask: '# ### ###',
}
const sponsors = ref([])
const sponsorsOptions = ref([])
const chosenSponsor = ref()
const chosenSums = ref()
const sponsorName = ref("")
const {numberWithSpaces} = useSponsors()
const {sponsorIdValidation, sumsValidation} = useStudents()
const props = defineProps<AddSponsorModalProps>()

const inputErrors = ref(props.inputError)
fetchSponsors()


type optionsType = {
  label: string;
  id: number;
}

watch(chosenSponsor, () => {
  inputErrors.value.sponsorId.status = false
  inputErrors.value.sponsorSumLimit.status = false
})

watch(chosenSums, () => {
  inputErrors.value.sums.status = false
  inputErrors.value.sponsorSumLimit.status = false
})

async function fetchSponsors() {
  try {
    const response = await publicApi.get('/sponsor-list/?page=1')
    if (response.status === 200) {
      sponsors.value = response.data
      sponsorsOptions.value = response.data.results.map((item: sponsorsListType) => ({
        id: item.id,
        label: item.full_name
      }))
      console.log(response.data)
    }
  } catch (error) {
    console.log(error)
  }
}


</script>