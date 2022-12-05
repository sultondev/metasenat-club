<template>
  <label
      class="main__wrapper flex border items-center bg-[#E8E8E8] bg-[#E0E7FF] rounded-[6px] p-[10px] min-w-[284px] max-h-[40px]"
      id="filter">
    <img src="@/assets/icons/website/search.svg" alt="Search Icon"
         class="icon-filter w-[20px] h-[20px] mr-[8px]">
    <input id="filter" class="main-filter__input bg-transparent outline-0 text-[15px]"
           placeholder="Izlash" v-model="filters"/>
  </label>
  <button class="rounded-[5px] w-[123px] min-h-[40px] bg-[#EDF1FD] text-[#3365FC] text-[14px] hover:bg-[#E0E7FF]"
          @click="sponsorStore.toggleFilterModal">
            <span
                class="icon-filter mr-[20px] text-[13px] ">
            </span>
    <span class="font-medium text-[14px]">Filter</span>
  </button>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useSponsorStore} from "@/store/useSponsorsStore";

const router = useRouter()
const route = useRoute()
const filters = ref(route.query.filters || "")
const sponsorStore = useSponsorStore()

const setFilter = () => {
  router.push({path: "/main/sponsors", query: {...route.query, filters: filters.value}})
}


watch(filters, async () => {
  sponsorStore.loading = true
  setTimeout(() => {
    setFilter()
    sponsorStore.loading = false
  }, 800)
})
</script>