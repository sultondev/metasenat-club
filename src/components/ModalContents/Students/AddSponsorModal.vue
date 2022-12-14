<template>
  <form class="min-w-[586px] p-[28px]" @submit.prevent>
    <div class="flex justify-between mb-[28px]">
      <h6 class="font-bold text-2xl">Homiy qo‘shish</h6>
      <button class="" @click="$emit('close-modal')">
        <img src="@/assets/icons/website/close.svg" alt="">
      </button>
    </div>
    <div class="separate__line mb-[28px] w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="mb-7">
      <BaseFormGroup variant="1" label-classes="font-medium text-xs uppercase mb-2"
                     label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                     id="none">
        <OneSelect title="Homiyni tanlang" label-classes="" :variant="1" required default-value=""
                   v-model="chosenSponsor"
                   classes=""
                   :options="sponsorsOptions"/>
      </BaseFormGroup>
    </div>
    <div class="mb-7">
      <BaseFormGroup id="summa" :variant="1" label-title="Ajratilingan summa"
                     label-classes="font-medium text-xs uppercase mb-2">
        <BaseInput id="summa" classes=""
                   class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:bg-[#E0E7FF]"
                   v-model="chosenSums" :required="true" default-value="0" :only-num="true"
                   :max-len="10" hint="Summani kiriting"/>
      </BaseFormGroup>
      <span>{{ numberWithSpaces(chosenSums) || 0 }} <span class="text-sm text-[#2E5BFF] font-medium">UZS</span></span>
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
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import OneSelect from "@/components/UI/OneSelect.vue"
import {publicApi} from "@/plugins/axios";
import {sponsorsListType} from "@/typing/types/sponsor";
import {useSponsors} from "@/composables/sponsors"
import {ref} from "vue";


interface AddSponsorModalProps {
  studentId: number
}


const sponsors = ref([])
const sponsorsOptions = ref([])
const chosenSponsor = ref()
const chosenSums = ref(0)
const {numberWithSpaces} = useSponsors()
const props = defineProps<AddSponsorModalProps>()
fetchSponsors()

type optionsType = {
  label: string;
  id: number;
}

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