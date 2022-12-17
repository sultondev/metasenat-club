<template>
  <section class="filtModal min-w-[586px] p-[28px]">
    <div class="flex justify-between mb-[28px]">
      <h6 class="text-2xl">
        Filter
      </h6>
      <button class="" @click="$emit('close-modal')">
        <span class="icon-close text-2xl text-[#B2B7C1] hover:text-red-600 transition-all ease-linear"></span>
      </button>
    </div>
    <div class="separate__line mb-[28px] w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[8px]">
        Ariza holati
      </h6>
      <MultiSelect :options="applicationOptions" :variant="1" v-model="selectedApplications"
                   inp-type="checkbox" :reset-value="selectedApplications" :hide-all="true"></MultiSelect>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[16px]">
        Homiylik summasi
      </h6>
      <div class="">
        <MultiSelect :options="generousSums" :variant="2" v-model="selectedSums"
                     inp-type="checkbox" :reset-value="selectedSums"></MultiSelect>
      </div>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[8px]">
        Sana
      </h6>
      <input type="date"
             class="border border-[#B2B7C1] rounded-[5px] py-[12px] px-[16px] min-w-[253px] text-[#2E384D59] bg-[#E0E7FF33]"
             placeholder="jwlai"
             v-model="date"
      >
    </div>
    <div class="separate__line mb-[28px] w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="flex justify-end gap-[16px] transition-all">
      <button class="flex items-center  py-[9px] px-[32px] rounded-[5px] border border-[#B2B7C1] hover:bg-[#E7E7E7]"
              @click="clearAll"
      >
        <span class="mr-[4px]">
          <img src="@/assets/icons/website/clean-modal.svg" alt="Eye white"></span>
        <span class="text-sm text-[#B2B7C1]">Tozalash</span>
      </button>
      <button class="bg-[#3366FF] text-white flex items-center py-[9px] px-[32px] rounded-[5px]"
              :class="[hoverForButtons]"
      >
        <span class="icon-eye mr-5 text-2xl"></span>
        <span class="text-sm">Natijalarini ko'rish</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import MultiSelect from "@/components/UI/MultiSelect.vue"
import {hoverForButtons} from "@/constants/UI-styles"

type optionsType = {
  label: string;
  id: number;
}


const applicationOptions: Ref<optionsType[]> = ref([
  {
    label: "barchasi",
    id: 86
  },
  {
    label: "yangi",
    id: 89
  },
  {
    label: "moderatsiyada",
    id: 90
  },
  {
    label: "tasdiqlangan",
    id: 20
  },
  {
    label: "bekor qilingan",
    id: 18
  }
])
const selectedApplications = ref<string[]>([])
const generousSums: any = ref<object[]>([
  {
    label: "1000000",
    id: 1291820
  },
  {
    label: "5000000",
    id: 88331
  },
  {
    label: "7000000",
    id: 24357
  },
  {
    label: "10000000",
    id: 96884
  },
  {
    label: "30000000",
    id: 2995
  },
  {
    label: "50000000",
    id: 28859
  }
])
const selectedSums: any = ref([])
const date = ref("")


function clearAll() {
  selectedSums.value = []
  selectedApplications.value = []
  date.value = ""
}

</script>

<style>

</style>
