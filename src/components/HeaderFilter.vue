<template>
  <BaseFormGroup variant="2"
                 :label-classes="['header-filter__name',{'cursor-not-allowed hover:bg-[#E0E7FF]': $route.path === '/main/dashboard'}]"
                 id="filter"
  >
    <template #defVal>
      <img src="@/assets/icons/website/search.svg" alt="Search Icon"
           class="icon-filter w-[20px] h-[20px] mr-[8px]">
    </template>
    <BaseInput classes="def__input" :hint="$t('header_filter.hint')" id="filter" v-model="filters"
               :disabled="$route.path === '/main/dashboard' ?? true"/>
  </BaseFormGroup>

  <button class="header-filter__button" @click="toggleModals">
    <span class="icon-filter mr-[20px] text-2xl font-bold"></span>
    <span class="header-filter__txt">{{ $t('header_filter.button') }}</span>
  </button>

  <teleport to="#modal">
    <TheModal @close-modal="closeModal"
              :show="modals.isSponsorsFilterOpen"
              :is-modal-open="modals.isSponsorsFilterOpen">
      <SponsorsFilterModal @close-modal="toggleModals"></SponsorsFilterModal>
    </TheModal>
  </teleport>

  <teleport to="#modal">
    <TheModal @close-modal="closeModal"
              :show="modals.isStudentsFilterOpen"
              :is-modal-open="modals.isStudentsFilterOpen">
      <StudentsFilterModal @close-modal="toggleModals"></StudentsFilterModal>
    </TheModal>
  </teleport>

</template>


<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import TheModal from "@/components/UI/TheModal.vue"
import SponsorsFilterModal from "@/components/ModalContents/Sponsors/SponsorsFilterModal.vue"
import StudentsFilterModal from "@/components/ModalContents/Students/StudentsFilterModal.vue"
import {useMainStore} from "@/store/useMainStore";


const router = useRouter()
const route = useRoute()
const filters = ref(route.query.filters || "")
const mainStore: any = useMainStore()
const modals = reactive({
  isSponsorsFilterOpen: false,
  isStudentsFilterOpen: false
})

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


function toggleModals() {
  if (route.path === '/main/sponsors') modals.isSponsorsFilterOpen = !modals.isSponsorsFilterOpen
  else if (route.path === '/main/students') modals.isStudentsFilterOpen = !modals.isStudentsFilterOpen
}

function closeModal(idx: number) {
  if (route.path === '/main/sponsors') modals.isSponsorsFilterOpen = false
  else if (route.path === '/main/students') modals.isStudentsFilterOpen = false
}

</script>

<style>
.header-filter__name {
  @apply flex items-center bg-[#E8E8E8] w-full focus-within:bg-[#E0E7FF] focus-within:border-primary border border-transparent rounded-md w-full py-2.5 px-2.5 min-w-[284px] disabled:cursor-not-allowed
}


.header-filter__button {
  @apply flex items-center justify-center rounded w-fit py-1.5 px-7 bg-[#EDF1FD] text-primary text-sm hover:bg-[#E0E7FF]
}

.header-filter__txt {
  @apply font-medium text-sm capitalize;
}
</style>