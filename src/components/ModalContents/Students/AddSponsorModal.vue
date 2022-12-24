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
      <BaseFormGroup variant="1" label-classes="font-medium text-xs uppercase mb-2"
                     label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                     id="none" :is-wrong="inputErrors.sponsorId.status" maxlength="30">
        <OneSelect :title='state.chosenSponsor ? "Homiy tanlangan" : "Homiy qo‘shish"' label-classes=""
                   :variant="1" required
                   v-model="state.chosenSponsor"
                   classes=""
                   :options="sponsorsOptions"
                   :is-wrong="inputErrors.sponsorId.status"
        />
      </BaseFormGroup>
      <div class="text-red-600">
        <span v-show="inputErrors.sponsorId.status">{{ inputErrors.sponsorId.message }}</span>
      </div>
    </div>
    <div class="mb-7">
      <BaseFormGroup id="summa" variant="1" label-title="Ajratilingan summa"
                     label-classes="font-medium text-xs uppercase mb-2">
        <BaseInput id="summa" classes=""
                   class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:bg-[#E0E7FF]"
                   v-model="state.chosenSums" :required="false"
                   hint="Summani kiriting" v-maska:[masks.sums]
                   :is-wrong="inputErrors.sums.status || inputErrors.sponsorSumLimit.status"
        />
      </BaseFormGroup>
      <div class="text-red-600 max-w-[500px]">
        <span class="whitespace-normal" v-show="inputErrors.sums.status">{{ inputErrors.sums.message }}</span>
        <span class="whitespace-normal"
              v-show="inputErrors.sponsorSumLimit.status">{{ inputErrors.sponsorSumLimit.message }}</span>
      </div>
    </div>
    <div class="separate__line mb-7 w-full h-[2px] bg-[#F5F5F7]"></div>

    <div class="flex justify-end">
      <button type="submit" @click="$emit('dataSubmit', state.chosenSponsor, state.chosenSums)"
              class="flex bg-[#3366FF] text-white py-2.5 px-8 rounded-[5px] items-center gap-x-2.5 hover-primary__buttons"
      >
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

// @ts-ignore
import {vMaska} from "maska"
import {reactive, ref, watch} from "vue"
import {publicApi} from "@/plugins/axios"
import {inputErrorsType, sponsorsListType} from "@/typing/types/sponsors";

interface AddSponsorModalProps {
  studentId: number
  inputError: inputErrorsType
}

const masks = {
  sums: {
    mask: (value: any) => value.length < 8 ? "### ###" : value.length > 9 ? '## ### ###' : '# ### ###',
  }
}

const sponsors = ref([])
const sponsorsOptions = ref([])

const state = reactive({
  chosenSponsor: 0,
  chosenSums: ""
})

const sponsorName = ref("")
const props = defineProps<AddSponsorModalProps>()

const inputErrors = ref(props.inputError)
fetchSponsors()


type optionsType = {
  label: string;
  id: number;
}

watch(() => state.chosenSponsor, () => {
  inputErrors.value.sponsorId.status = false
  inputErrors.value.sponsorSumLimit.status = false
})

watch(() => state.chosenSums, () => {
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