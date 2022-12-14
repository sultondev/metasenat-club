<template>
  <label
      class="main__wrapper relative flex items-center bg-[#E8E8E8] focus-within:bg-[#E0E7FF] items-center rounded-[6px] p-[10px] min-w-[284px] max-h-[40px]"
      :class="{'cursor-not-allowed': $route.path === '/main/dashboard', 'hover:bg-[#E0E7FF]': $route.path !== '/main/dashboard'}"
      id="filter">
    <img src="@/assets/icons/website/search.svg" alt="Search Icon"
         class="icon-filter w-[20px] h-[20px] mr-[8px]">
    <input id="filter" class="main-filter__input bg-transparent outline-0 text-[15px] disabled:cursor-not-allowed"
           placeholder="Izlash" v-model="filters" :disabled="$route.path === '/main/dashboard' ?? true"/>
    <span v-if="filters.length > 0 ">
      <button class="absolute right-2 top-[24%]" @click="clearFilter">
        <img src="@/assets/icons/website/close-icon.svg" class="w-[20px]" alt="close">
      </button>
    </span>
  </label>
  <button
      class="rounded-[5px] w-[123px] min-h-[40px] bg-[#EDF1FD] text-[#3365FC] text-[14px] hover:bg-[#E0E7FF]"
      @click="mainStore.toggleFilterModal">
            <span
                class="icon-filter mr-[20px] text-[13px] ">
            </span>
    <span class="font-medium text-[14px]">Filter</span>
  </button>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useMainStore} from "@/store/useMainStore";


const router = useRouter()
const route = useRoute()
const filters = ref(route.query.filters || "")
const mainStore: any = useMainStore()

const setFilter = () => {
  router.push({path: route.path, query: {...route.query, filters: filters.value}})
}

const clearFilter = () => {
  filters.value = ""
}

watch(() => route.name, async () => {
  clearFilter()
})

watch(filters, async () => {
  mainStore.loading = true
  if (route.name === 'sponsors-list' || route.name === 'students-list') {
    setTimeout(() => {
      setFilter()
      mainStore.loading = false
    }, 1000)
  }
})

</script>