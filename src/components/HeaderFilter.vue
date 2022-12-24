<template>
  <BaseFormGroup variant="2" label-classes="header-filter__name"
                 :label-classes="{'cursor-not-allowed': $route.path === '/main/dashboard', 'hover:bg-[#E0E7FF]': $route.path !== '/main/dashboard'}"
                 id="filter"
  >
    <template #defVal>
      <img src="@/assets/icons/website/search.svg" alt="Search Icon"
           class="icon-filter w-[20px] h-[20px] mr-[8px]">
    </template>
    <BaseInput classes="def__input" hint="Izlash" id="filter" v-model="filters"
               :disabled="$route.path === '/main/dashboard' ?? true"/>
  </BaseFormGroup>

  <button class="header-filter__button" @click="mainStore.toggleFilterModal">
            <span
                class="icon-filter mr-[20px] text-2xl font-bold ">
            </span>
    <span class="font-medium text-[14px]">Filter</span>
  </button>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useMainStore} from "@/store/useMainStore";
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"


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

<style>
.header-filter__name {
  @apply flex items-center bg-[#E8E8E8] w-full focus-within:bg-[#E0E7FF] focus-within:border-primary border border-transparent rounded-md w-full py-2.5 px-2.5 min-w-[284px] disabled:cursor-not-allowed
}


.header-filter__button {
  @apply flex items-center justify-center rounded w-fit py-[10px] px-7 bg-[#EDF1FD] text-primary text-sm hover:bg-[#E0E7FF]
}

</style>