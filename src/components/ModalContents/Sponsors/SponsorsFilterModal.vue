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
      <MultiSelect :options="applicationOptions" :variant="1" v-model="detailedFilters.applicationStatuses"
                   inp-type="checkbox" :default-value="defaults.applicationStatuses"
                   :hide-all="true">
      </MultiSelect>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[16px]">
        Homiylik summasi
      </h6>
      <div class="">
        <OneSelect :options="generousSums" :variant="2" v-model="detailedFilters.sum"
                   inp-type="checkbox" :default-value="defaults.sum">
        </OneSelect>
      </div>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium mb-[8px]">
        Sana
      </h6>
      <BaseInput inp-type="date"
                 class="border border-[#B2B7C1] rounded-[5px] py-[12px] px-[16px] max-w-[253px] text-[#2E384D59] bg-[#E0E7FF33]"
                 placeholder="jwlai"
                 v-model="detailedFilters.date"
                 :default-value="defaults.date"
      />
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

const router = useRouter()
const route = useRoute()
const applicationOptions: Ref<optionsType[]> = ref(sponsorStatuses)
const generousSums: any = ref<object[]>(generousOptions)
const detailedFilters = reactive({
  applicationStatuses: [],
  sum: "",
  date: "",
  statuses: []
})

const defaults = reactive({
  sum: route.query.sum || "",
  date: route.query.date || "",
  applicationStatuses: checkArray(route.query.statuses) || []
})

function clearAll() {
  detailedFilters.applicationStatuses = []
  detailedFilters.sum = ""
  detailedFilters.date = ""
}

async function search() {
  await router.push({
    name: 'sponsors-list',
    query: {
      ...route.query,
      statuses: [...detailedFilters.applicationStatuses],
      sum: detailedFilters.sum,
      date: detailedFilters.date
    }
  })
}


</script>

<style>

</style>
