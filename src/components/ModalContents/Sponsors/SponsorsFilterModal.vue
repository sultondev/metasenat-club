<template>
  <section class="filtModal min-w-[586px] p-[28px]">
    <div class="flex justify-between mb-[28px]">
      <h6 class="text-2xl">
        Filter
      </h6>
      <button class="" @click="emits('closeModal')">
        <span class="icon-close text-2xl text-[#B2B7C1] hover:text-red-600 transition-all ease-linear"></span>
      </button>
    </div>
    <div class="separate__line"></div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[8px]">
        Ariza holati
      </h6>
      <MultiSelect :options="applicationOptions" :variant="1" v-model="detailedFilters.statuses"
                   :default-value="detailedFilters.statuses"
                   :hide-all="true">
      </MultiSelect>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[16px]">
        Homiylik summasi
      </h6>
      <div class="">
        <OneSelect :options="generousSums" :variant="2" v-model="detailedFilters.sum"
                   :default-value="detailedFilters.sum">
        </OneSelect>
      </div>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[8px]">
        Sana
      </h6>
      <input type="date"
             class="border border-[#B2B7C1] rounded-[5px] py-[12px] px-[16px] max-w-[253px] text-[#2E384D59] bg-[#E0E7FF33]"
             placeholder="jwlai"
             v-model="detailedFilters.date"
             :default-value="detailedFilters.date"
      />
    </div>
    <div class="separate__line"></div>
    <div class="flex justify-end gap-[16px] transition-all">
      <button class="flex items-center  py-[9px] px-[32px] rounded-[5px] border border-[#B2B7C1] hover:bg-[#E7E7E7]"
              @click="clearAll"
      >
        <span class="mr-[4px]">
          <img src="@/assets/icons/website/clean-modal.svg" alt="Eye white"></span>
        <span class="text-sm text-[#B2B7C1]">Tozalash</span>
      </button>
      <button class="hover-primary__buttons bg-[#3366FF] text-white flex items-center py-[9px] px-[32px] rounded-[5px]"
              @click="search"
      >
        <span class="icon-eye mr-5 text-2xl"></span>
        <span class="text-sm">Natijalarini ko'rish</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import {reactive, Ref, ref} from "vue";
import MultiSelect from "@/components/UI/MultiSelect.vue"
import OneSelect from "@/components/UI/OneSelect.vue";
import {useRoute, useRouter} from "vue-router";
import {generousOptions, sponsorStatuses} from "@/constants/sponsors";
import BaseInput from "@/components/UI/BaseInput.vue"
import {checkArray} from "@/helpers/mainHelpers";

type optionsType = {
  label: string;
  id: number;
}

interface Emits {
  (e: 'closeModal'): void
}

const router = useRouter()
const route = useRoute()
const emits = defineEmits<Emits>()
const applicationOptions: Ref<optionsType[]> = ref(sponsorStatuses)
const generousSums: any = ref<object[]>(generousOptions)
const detailedFilters = reactive({
  sum: route.query.sum || "",
  date: route.query.date || "2021-01-01",
  statuses: checkArray(route.query.statuses) || []
})

function clearAll() {
  detailedFilters.statuses = []
  detailedFilters.sum = ""
  detailedFilters.date = ""
  router.push({
    name: 'sponsors-list',
    query: {}
  })
  emits('closeModal')
}

async function search() {
  await router.push({
    name: 'sponsors-list',
    query: {
      ...route.query,
      statuses: [...detailedFilters.statuses],
      sum: detailedFilters.sum,
      date: String(detailedFilters.date) || ""
    }
  })
  emits('closeModal')
}


</script>

<style>

</style>
